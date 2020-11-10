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
    };

    return User;
};
