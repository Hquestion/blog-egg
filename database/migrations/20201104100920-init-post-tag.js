module.exports = {
    up: async (queryInterface, Sequelize) => {
        const { STRING } = Sequelize;
        await queryInterface.createTable('t_post_tags', {
            uuid: { primaryKey: true, type: STRING(30), allowNull: false },
            postTag: { type: STRING(30), field: 'post_tag_id', allowNull: false },
            tag: { type: STRING(30), field: 'tag_id', allowNull: false },
            createdAt: { type: STRING(30), field: 'created_at' },
            updatedAt: { type: STRING(30), field: 'updated_at' },
        });
    },

    down: async queryInterface => {
        await queryInterface.dropTable('t_post_tags');
    },
};
