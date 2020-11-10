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
        isDelete: { type: STRING(1), defaultValue: '0', field: 'is_delete' },
        createdAt: { type: STRING(30), field: 'created_at' },
        updatedAt: { type: STRING(30), field: 'updated_at' },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    Star.associate = function() {
        app.model.Star.belongsTo(app.model.User, { as: 'userMeta', foreignKey: 'user_id' });
        app.model.Star.belongsTo(app.model.Post, { as: 'postMeta', foreignKey: 'post_id' });
    };

    return Star;
};
