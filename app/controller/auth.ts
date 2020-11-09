import { Controller } from 'egg';

export default class AuthController extends Controller {
    public async login() {
        const { ctx, app } = this;
        console.log(ctx.request.query);
        console.log(ctx.request.body);
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
    }
}
