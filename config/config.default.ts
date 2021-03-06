import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
    const config = {} as PowerPartial<EggAppConfig>;
    config.baseDir = '';
    config.staticUrlPrefix = 'http://localhost:7001/public';

    // override config from framework / plugin
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1604397095848_2169';
    config.jwtSecrect = '_1604397095848_2169';
    config.login_token_time = 24 * 60 * 60;
    config.github_client_id = '1c965b3179608b9a014d';
    config.github_client_secret = '92ef8da791d3662835cc0bde336d8717d067cc6e';

    exports.view = {
        mapping: {
            '.ejs': 'ejs',
        },
    };

    // add your egg config in here
    config.middleware = [
        'jwt',
    ];

    config.multipart = {
        mode: 'file',
    };

    config.jwt = {
        enable: true,
        ignore(ctx) {
            const ignoredStaticUrls = [ '/api/v1/login', '/public', '/api/v1/common/upload' ];
            const getNeedValidate = [ '/api/v1/userInfo', '/api/v1/star/isStar' ];
            if (ignoredStaticUrls.some(urlPrefix => ctx.url.startsWith(urlPrefix))) {
                return true;
            }
            if (ctx.method.toLowerCase() === 'get' && getNeedValidate.some(item => ctx.url.startsWith(item))) {
                return false;
            }
            return ![ 'post', 'put', 'delete' ].includes(ctx.method.toLowerCase());
        },
    };
    config.redis = {
        client: {
            port: 6379,
            host: '127.0.0.1',
            password: '123456',
            db: 0,
        },
    };
    config.security = {
        csrf: {
            enable: false,
        },
    };
    config.mysql = {
        // 单数据库信息配置
        client: {
            // host
            host: '127.0.0.1',
            // 端口号
            port: '3306',
            // 用户名
            user: 'root',
            // 密码
            password: 'root',
            // 数据库名
            database: 'blog_node',
        },
        // 是否加载到 app 上，默认开启
        app: true,
        // 是否加载到 agent 上，默认关闭
        agent: false,
    };
    config.sequelize = {
        dialect: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        // 密码
        password: 'root',
        database: 'blog_node',
    };
    // 异常处理配置
    config.onerror = {
        html(err, ctx) {
            // html handler
            ctx.body = '<h3>' + err + '</h3>';
            ctx.status = 500;
        },
        json(err, ctx) {
            // json handler
            ctx.body = { message: err };
            ctx.status = 500;
        },
    };
    // add your special config in here
    const bizConfig = {
        sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
    };

    // the return config will combines to EggAppConfig
    return {
        ...config,
        ...bizConfig,
    };
};
