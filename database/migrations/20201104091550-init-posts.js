module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        const { INTEGER, STRING } = Sequelize;
        await queryInterface.createTable('t_posts', {
            uuid: { type: STRING(30), primaryKey: true },
            title: STRING(30),
            subtitle: STRING(100),
            content: { type: STRING },
            cover: STRING(100),
            postTag: { type: STRING(30), allowNull: true, field: 'post_tag_id' },
            category: { type: STRING(30), allowNull: true, field: 'category_id' },
            series: { type: STRING(30), allowNull: true, field: 'series_id' },
            author: { type: STRING(30), allowNull: false, field: 'author_id' },
            read: INTEGER(10),
            fav: INTEGER(10),
            star: INTEGER(10),
            comment: INTEGER(10),
            isPublished: { type: STRING(1), defaultValue: '0', field: 'is_published' },
            isDelete: { type: STRING(1), defaultValue: '0', field: 'is_delete' },
            isTop: { type: STRING(1), defaultValue: '0', field: 'is_top' },
            createdAt: { type: STRING(30), field: 'created_at' },
            updatedAt: { type: STRING(30), field: 'updated_at' },
        });
    },

    down: async queryInterface => {
        await queryInterface.dropTable('t_posts');
    },
};
