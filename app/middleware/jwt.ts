import * as fs from 'fs';
import * as path from 'path';
import * as jwt from 'jsonwebtoken';

type verifiedToken = {
    username?: string,
    userid?: string
};

// 解密，验证
function verifyToken(token, secret?: string): verifiedToken {
    const cert = secret || fs.readFileSync(path.join(__dirname, '../public/rsa_public_key.pem')); // 公钥，看后面生成方法
    let res = {};
    try {
        const result = jwt.verify(token, cert) || {};
        const { exp } = result,
            current = Math.floor(Date.now() / 1000);
        if (current <= exp) res = result.data || {};
    } catch (e) {
        // pass
    }
    return res;
}

module.exports = (_options, app) => {
    return async function userInterceptor(ctx, next) {
        let authToken = ctx.header.authorization; // 获取header里的authorization
        if (authToken) {
            authToken = authToken.substring(7);
            const res = verifyToken(authToken, app.config.jwtSecrect); // 解密获取的Token
            if (res.username && res.userid) {
                // 如果需要限制单端登陆或者使用过程中废止某个token，或者更改token的权限。也就是说，一旦 JWT 签发了，在到期之前就会始终有效
                // 此处使用redis进行保存
                const redis_token = await app.redis.get(res.username + '' + res.userid); // 获取保存的token
                if (authToken === redis_token) {
                    ctx.locals.username = res.username;
                    ctx.locals.userid = res.userid;
                    await next();
                } else {
                    ctx.status = 401;
                    ctx.body = { code: 50012, msg: '您的账号已在其他地方登录' };
                }
            } else {
                ctx.status = 401;
                ctx.body = { code: 50012, msg: '登录状态已过期' };
            }
        } else {
            ctx.status = 403;
            ctx.body = { code: 50008, msg: '请登陆后再进行操作' };
        }
    };
};
