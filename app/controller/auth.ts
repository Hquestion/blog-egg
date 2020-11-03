import { Controller } from 'egg';

export default class AuthController extends Controller {
    public async login() {
        const { ctx, app } = this;
        console.log(ctx.data);
        const usersData = ctx.data;
        // todo 校验用户账号密码是否正确，获取用户id等信息
        const token = ctx.helper.loginToken({ corpid: usersData.corpid, userid: usersData.userid }, app.config.jwtSecret, 7200);
        await app.redis.get('loginToken');
        await app.redis.set(usersData.corpid + usersData.userid, token, 'ex', 7200);
        ctx.body = { data: { token, expires: this.config.login_token_time }, code: 1, msg: '登录成功' };
    }

    public async logout() {
    // TODO 登出
    }
}
