import { Controller } from 'egg';

export default class AuthController extends Controller {
    public async login() {
        const { ctx, app } = this;
        const usersData = ctx.request.body;
        // todo 校验用户账号密码是否正确，获取用户id等信息
        const user = await ctx.service.users.findUserByUsername(usersData.username);
        if (user.password !== usersData.password) {
            ctx.status = 400;
            ctx.body = { code: 50009, msg: '账号或密码错误' };
            return;
        }
        const token = ctx.helper.loginToken({ username: user.name, userid: user.uuid }, app.config.jwtSecrect, 7200);
        await app.redis.set(user.name + '' + user.uuid, token, 'ex', 7200);
        ctx.body = { data: { token, expires: this.config.login_token_time }, msg: '登录成功' };
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
        const authorizeRes = await ctx.curl('https://github.com/login/oauth/authorize');
        console.log(authorizeRes);
        const tokenRes = await ctx.curl(`https://github.com/login/oauth/access_token?
        client_id=${app.config.github_client_id}&client_secret=${app.config.github_client_secret}
        &code=${code}`, {
            method: 'POST',
            // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
            contentType: 'json',
            headers: {
                accept: 'application/json',
            },
        });
        console.log(tokenRes);
        const accessToken = tokenRes.data.accessToken;
        console.log(accessToken);
        const result = await ctx.curl('https://api.github.com/user', {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `token ${accessToken}`,
            },
        });
        return result;
    }
}
