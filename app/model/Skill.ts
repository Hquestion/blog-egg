module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;

    const Series = app.model.define('t_skills', {
        uuid: { primaryKey: true, type: STRING(30) },
        title: STRING(30),
        description: STRING(100),
        user: {
            field: 'user_id',
            type: STRING(30),
            allowNull: true,
        },
        percent: INTEGER(3),
        color: STRING(10),
        isDelete: { type: STRING(1), defaultValue: '0', field: 'is_delete' },
        createdAt: { type: STRING(30), field: 'created_at' },
        updatedAt: { type: STRING(30), field: 'updated_at' },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    Series.associate = function() {
        app.model.Skill.belongsTo(app.model.User, { as: 'userMeta', foreignKey: 'user_id' });
    };

    return Series;
};
