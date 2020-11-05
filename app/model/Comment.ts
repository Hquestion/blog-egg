module.exports = app => {
    const { STRING } = app.Sequelize;

    const Comment = app.model.define('t_comments', {
        uuid: { primaryKey: true, type: STRING(30) },
        content: STRING(5000),
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
        isDelete: { type: STRING(1), defaultValue: '0', field: 'is_delete' },
        createdAt: { type: STRING(30), field: 'created_at' },
        updatedAt: { type: STRING(30), field: 'updated_at' },
    });

    Comment.associate = function() {
        app.model.Comment.belongsTo(app.model.User, { as: 'userMeta', foreignKey: 'user_id' });
        app.model.Comment.belongsTo(app.model.Post, { as: 'postMeta', foreignKey: 'post_id' });
        app.model.Comment.belongsTo(app.model.Comment, { as: 'commentMeta', foreignKey: 'comment_id' });
    };

    return Comment;
};
