module.exports = app => {
    const { STRING } = app.Sequelize;

    const Tag = app.model.define('t_tags', {
        uuid: { primaryKey: true, type: STRING(30) },
        title: STRING(30),
        description: STRING(100),
        user: {
            field: 'user_id',
            type: STRING(30),
            allowNull: true,
        },
        isDelete: { type: STRING(1), defaultValue: '0', field: 'is_delete' },
        createdAt: { type: STRING(30), field: 'created_at' },
        updatedAt: { type: STRING(30), field: 'updated_at' },
    });

    Tag.associate = function() {
        app.model.Tag.belongsTo(app.model.User, { as: 'userMeta', foreignKey: 'user_id' });
    };

    return Tag;
};
