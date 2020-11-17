module.exports = {
    up: async (queryInterface, Sequelize) => {
        const { STRING, INTEGER } = Sequelize;
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.addColumn('t_users', 'github_url', {
            field: 'github_url',
            type: STRING(100),
            allowNull: true,
        });
        await queryInterface.addColumn('t_users', 'blog_url', {
            field: 'blog_url',
            type: STRING(100),
            allowNull: true,
        });
        await queryInterface.addColumn('t_users', 'location', {
            field: 'location',
            type: STRING(100),
            allowNull: true,
        });
        await queryInterface.addColumn('t_users', 'company', {
            field: 'company',
            type: STRING(100),
            allowNull: true,
        });
        await queryInterface.addColumn('t_users', 'bio', {
            field: 'bio',
            type: STRING(500),
            allowNull: true,
        });
        await queryInterface.addColumn('t_users', 'github_followers', {
            field: 'github_followers',
            type: INTEGER(10),
            allowNull: true,
        });
        await queryInterface.addColumn('t_users', 'github_followers_url', {
            field: 'github_followers_url',
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
        await queryInterface.removeColumn('t_users', 'github_url');
        await queryInterface.removeColumn('t_users', 'blog_url');
        await queryInterface.removeColumn('t_users', 'location');
        await queryInterface.removeColumn('t_users', 'company');
        await queryInterface.removeColumn('t_users', 'bio');
        await queryInterface.removeColumn('t_users', 'github_followers');
        await queryInterface.removeColumn('t_users', 'github_followers_url');
    },
};
