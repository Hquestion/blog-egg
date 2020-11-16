module.exports = {
    up: async (queryInterface, Sequelize) => {
        const { STRING } = Sequelize;
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.addColumn('t_series', 'logo', {
            field: 'logo',
            type: STRING(100),
            allowNull: true,
        });
    },

    down: async queryInterface => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeColumn('t_series', 'logo');
    },
};
