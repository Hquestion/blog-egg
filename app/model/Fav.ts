module.exports = app => {
    const { STRING } = app.Sequelize;

    const Fav = app.model.define('t_favs', {
        uuid: { primaryKey: true, type: STRING(30) },
        title: STRING(30),
        description: STRING(100),
        user: {
            field: 'user_id',
            type: STRING(30),
            allowNull: false,
        },
        post: {
            field: 'post_id',
            type: STRING(30),
            allowNull: false,
        },
        folder: {
            field: 'folder_id',
            type: STRING(30),
            allowNull: true,
        },
        createdAt: { type: STRING(30), field: 'created_at' },
        updatedAt: { type: STRING(30), field: 'updated_at' },
    });

    Fav.associate = function() {
        app.model.Fav.hasMany(app.model.User, { as: 't_users', foreignKey: 'user_id' });
        app.model.Fav.hasMany(app.model.Post, { as: 't_posts', foreignKey: 'post_id' });
        app.model.Fav.hasOne(app.model.FavFolder, { as: 't_fav_folders', foreignKey: 'folder_id' });
    };

    return Fav;
};
