module.exports = {
    up: async (queryInterface, Sequelize) => {
        const { STRING } = Sequelize;
        await queryInterface.createTable('t_fav_folders', {
            uuid: { primaryKey: true, type: STRING(30) },
            title: STRING(30),
            description: STRING(100),
            user: {
                field: 'user_id',
                type: STRING(30),
                allowNull: false,
            },
            createdAt: { type: STRING(30), field: 'created_at' },
            updatedAt: { type: STRING(30), field: 'updated_at' },
        });
    },

    down: async queryInterface => {
        await queryInterface.dropTable('t_fav_folders');
    },
};
