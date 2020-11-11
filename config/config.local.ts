import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
    const config: PowerPartial<EggAppConfig> = {};
    config.staticUrlPrefix = 'http://localhost:7001/public';
    return config;
};
