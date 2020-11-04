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
        createdAt: { type: STRING(30), field: 'created_at' },
        updatedAt: { type: STRING(30), field: 'updated_at' },
    });

    Series.associate = function() {
        app.model.Series.belongsTo(app.model.User, { as: 't_users', foreignKey: 'user_id' });
    };

    return Series;
};
