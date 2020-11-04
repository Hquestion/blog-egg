module.exports = app => {
    const { STRING } = app.Sequelize;

    const Star = app.model.define('t_stars', {
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
        createdAt: { type: STRING(30), field: 'created_at' },
        updatedAt: { type: STRING(30), field: 'updated_at' },
    });

    Star.associate = function() {
        app.model.Star.hasMany(app.model.User, { as: 't_users', foreignKey: 'user_id' });
        app.model.Star.hasMany(app.model.Post, { as: 't_posts', foreignKey: 'post_id' });
    };

    return Star;
};
