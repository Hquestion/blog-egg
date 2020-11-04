import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
    const config = {} as PowerPartial<EggAppConfig>;

    // override config from framework / plugin
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1604397095848_2169';
    config.jwtSecrect = '_1604397095848_2169';

    // add your egg config in here
    config.middleware = [
        'jwt',
    ];

    config.jwt = {
        enable: true,
        ignore: [ '/api/v1/login/', '/public/' ], // 哪些请求不需要认证
    };
    config.redis = {
        client: {
            port: 6379,
            host: '127.0.0.1',
            password: 'auth',
            db: 0,
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
            database: 'blog-node',
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
        // 用户名
        user: 'root',
        // 密码
        password: 'root',
        database: 'blog-node',
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
