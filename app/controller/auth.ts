import { Controller } from 'egg';
import { UserType } from '../../typings';

export default class AuthController extends Controller {
    public async login() {
        const { ctx } = this;
        const usersData = ctx.request.body;
        // todo 校验用户账号密码是否正确，获取用户id等信息
        const user = await ctx.service.users.findUserByUsername(usersData.username);
        if (user.password !== usersData.password) {
            ctx.status = 400;
            ctx.body = { code: 50009, msg: '账号或密码错误' };
            return;
        }
        ctx.body = await this.generateToken(user);
    }

    public async register() {
        // todo 注册
    }

    public async logout() {
        // TODO 登出
        const { ctx, app } = this;
        if (ctx.locals.userid) {
            await app.redis.del(ctx.locals.username + '' + ctx.locals.userid);
            ctx.locals.username = null;
            ctx.locals.userid = null;
            ctx.status = 200;
        } else {
            ctx.status = 401;
        }
    }

    public async githubLogin() {
        const { ctx, app } = this;
        const { code } = ctx.query;
        try {
            const tokenRes = await ctx.curl('https://github.com/login/oauth/access_token?' +
                `client_id=${app.config.github_client_id}&client_secret=${app.config.github_client_secret}` +
                `&code=${code}&state=987654321`, {
                method: 'POST',
                // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
                contentType: 'json',
                dataType: 'json',
                timeout: [ 10000, 20000 ],
                headers: {
                    accept: 'application/json',
                },
            });
            const accessToken = tokenRes.data.access_token;
            const result = await ctx.curl('https://api.github.com/user', {
                method: 'GET',
                contentType: 'json',
                dataType: 'json',
                timeout: [ 10000, 20000 ],
                headers: {
                    accept: 'application/json',
                    Authorization: `token ${accessToken}`,
                },
            });
            const userMeta = this.generateUserInfoFormGithub(result.data);
            let user = await ctx.service.users.findUserByUsername(userMeta.name);
            ctx.logger.info('[GITHUB LOGIN]: GET USER WITH name: ' + userMeta.name + ', user info: ' + JSON.stringify(user));
            if (user && user.uuid) {
                // 如果已注册，更新用户信息，生成jwt token，直接跳转登陆成功
            } else {
                // 未注册，先创建用户，再生成jwt token，跳转登陆成功
                user = await ctx.service.users.createUser(userMeta);
            }
            const jwtTokenData = await this.generateToken(user);
            await ctx.render('login.ejs', {
                data: jwtTokenData.data,
            }, {
                viewEngine: 'ejs',
            });
        } catch (e) {
            throw e;
        }
    }

    private generateUserInfoFormGithub(data): Partial<UserType> {
        const meta: Partial<UserType> = {};
        meta.name = data.name;
        meta.nickname = data.name;
        meta.avatar = data.avatar_url;
        meta.email = data.email;
        meta.location = data.location;
        meta.company = data.company;
        meta.bio = data.bio;
        meta.githubUrl = data.html_url;
        meta.blogUrl = data.blog;
        meta.githubFollwers = data.follwers;
        meta.githubFollwersUrl = data.followers_url;
        return meta;
    }

    private async generateToken(user) {
        const { ctx, app } = this;
        const token = ctx.helper.loginToken({ username: user.name, userid: user.uuid }, app.config.jwtSecrect, 7200);
        await app.redis.set(user.name + '' + user.uuid, token, 'ex', 7200);
        return { data: { token, expires: this.config.login_token_time }, msg: '登录成功' };
    }
}
