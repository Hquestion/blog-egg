module.exports = app => {
    const { STRING } = app.Sequelize;

    const Comment = app.model.define('t_comments', {
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
        comment: {
            field: 'comment_id',
            type: STRING(30),
            allowNull: true,
        },
        createdAt: { type: STRING(30), field: 'created_at' },
        updatedAt: { type: STRING(30), field: 'updated_at' },
    });

    Comment.associate = function() {
        app.model.Comment.hasMany(app.model.User, { as: 't_users', foreignKey: 'user_id' });
        app.model.Comment.hasMany(app.model.Post, { as: 't_posts', foreignKey: 'post_id' });
        app.model.Comment.hasMany(app.model.Comment, { as: 't_comments', foreignKey: 'comment_id' });
    };

    return Comment;
};
