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
