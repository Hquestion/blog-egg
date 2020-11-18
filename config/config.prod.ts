import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
    const config: PowerPartial<EggAppConfig> = {};
    config.staticUrlPrefix = 'http://hquestion.cn/public';

    config.redis = {
        client: {
            port: 6379,
            host: '47.100.229.203',
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
            host: '47.100.229.203',
            // 端口号
            port: '3306',
            // 用户名
            user: 'root',
            // 密码
            password: '123456',
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
        host: '47.100.229.203',
        port: 3306,
        // 密码
        password: '123456',
        database: 'blog_node',
    };
    return config;
};
