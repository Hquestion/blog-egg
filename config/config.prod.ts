import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
    const config: PowerPartial<EggAppConfig> = {};
    config.staticUrlPrefix = 'http://hquestion.cn/public';
    return config;
};
