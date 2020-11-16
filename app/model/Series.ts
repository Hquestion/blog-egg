module.exports = app => {
    const { STRING } = app.Sequelize;

    const Series = app.model.define('t_series', {
        uuid: { primaryKey: true, type: STRING(30) },
        title: STRING(30),
        description: STRING(100),
        user: {
            field: 'user_id',
            type: STRING(30),
            allowNull: true,
        },
        logo: STRING(100),
        isDelete: { type: STRING(1), defaultValue: '0', field: 'is_delete' },
        createdAt: { type: STRING(30), field: 'created_at' },
        updatedAt: { type: STRING(30), field: 'updated_at' },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    Series.associate = function() {
        app.model.Series.belongsTo(app.model.User, { as: 'userMeta', foreignKey: 'user_id' });
        app.model.Series.hasMany(app.model.Post, { as: 'postList', foreignKey: 'series' });
    };

    return Series;
};
