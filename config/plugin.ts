import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
    static: true,
    // nunjucks: {
    //     enable: true,
    //     package: 'egg-view-nunjucks',
    // },
    redis: {
        enable: true,
        package: 'egg-redis',
    },
    mysql: {
        enable: true,
        package: 'egg-mysql',
    },
    sequelize: {
        enable: true,
        package: 'egg-sequelize',
    },
    ejs: {
        enable: true,
        package: 'egg-view-ejs',
    },
};
export default plugin;
