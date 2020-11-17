module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;

    const User = app.model.define('t_users', {
        uuid: { type: STRING(30), primaryKey: true },
        name: STRING(30),
        age: INTEGER,
        gender: { type: STRING(1), defaultValue: '3' },
        nickname: STRING(30),
        avatar: STRING(200),
        email: STRING(30),
        phone: STRING(20),
        password: STRING(100),
        wechat: STRING(30),
        openid: STRING(30),
        unionid: STRING(30),
        githubUrl: {
            type: STRING(100),
            field: 'github_url',
        },
        blogUrl: {
            type: STRING(100),
            field: 'blog_url',
        },
        location: {
            type: STRING(100),
            field: 'location',
        },
        company: {
            type: STRING(100),
            field: 'company',
        },
        bio: {
            type: STRING(500),
            field: 'bio',
        },
        githubFollowers: {
            type: INTEGER(10),
            field: 'github_followers',
        },
        githubFollowersUrl: {
            type: STRING(100),
            field: 'github_followers_url',
        },
        isDelete: { type: STRING(1), defaultValue: '0', field: 'is_delete' },
        isAdmin: { type: STRING(1), defaultValue: '0', field: 'is_admin' },
        createdAt: { type: STRING(30), field: 'created_at' },
        updatedAt: { type: STRING(30), field: 'updated_at' },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    User.associate = function() {
        app.model.User.hasMany(app.model.Post, { as: 'posts', foreignKey: 'author_id' });
        app.model.User.hasMany(app.model.Category, { as: 'categories', foreignKey: 'user_id' });
        app.model.User.hasMany(app.model.Comment, { as: 'comments', foreignKey: 'user_id' });
        app.model.User.hasMany(app.model.Fav, { as: 'favs', foreignKey: 'user_id' });
        app.model.User.hasMany(app.model.FavFolder, { as: 'favFolders', foreignKey: 'user_id' });
        app.model.User.hasMany(app.model.Series, { as: 'series', foreignKey: 'user_id' });
        app.model.User.hasMany(app.model.Star, { as: 'stars', foreignKey: 'user_id' });
        app.model.User.hasMany(app.model.Tag, { as: 'tags', foreignKey: 'user_id' });
        app.model.User.hasMany(app.model.Skill, { as: 'skills', foreignKey: 'user_id' });
    };

    return User;
};
