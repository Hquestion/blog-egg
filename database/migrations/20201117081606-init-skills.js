module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        const { STRING, INTEGER } = Sequelize;
        await queryInterface.createTable('t_skills', {
            uuid: { primaryKey: true, type: STRING(50), allowNull: false },
            title: STRING(30),
            description: STRING(100),
            user: {
                field: 'user_id',
                type: STRING(50),
                allowNull: false,
            },
            percent: INTEGER(3),
            color: STRING(10),
            isDelete: { type: STRING(1), defaultValue: '0', field: 'is_delete' },
            createdAt: { type: STRING(30), field: 'created_at' },
            updatedAt: { type: STRING(30), field: 'updated_at' },
        });
    },

    down: async queryInterface => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable('t_skills');
    },
};
