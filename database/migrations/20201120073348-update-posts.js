module.exports = {
    up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
        const { TEXT } = Sequelize;
        await queryInterface.changeColumn('t_posts', 'content', {
            field: 'content',
            type: TEXT('long'),
            allowNull: true,
        });
    },

    down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
        const { STRING } = Sequelize;
        await queryInterface.changeColumn('t_posts', 'content', {
            field: 'content',
            type: STRING,
            allowNull: true,
        });
    },
};
