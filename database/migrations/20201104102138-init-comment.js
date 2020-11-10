module.exports = {
    up: async (queryInterface, Sequelize) => {
        const { STRING } = Sequelize;
        await queryInterface.createTable('t_comments', {
            uuid: { primaryKey: true, type: STRING(50), allowNull: false },
            content: STRING(5000),
            user: {
                field: 'user_id',
                type: STRING(50),
                allowNull: false,
            },
            post: {
                field: 'post_id',
                type: STRING(50),
                allowNull: false,
            },
            comment: {
                field: 'comment_id',
                type: STRING(50),
                allowNull: true,
            },
            isDelete: { type: STRING(1), defaultValue: '0', field: 'is_delete' },
            createdAt: { type: STRING(30), field: 'created_at' },
            updatedAt: { type: STRING(30), field: 'updated_at' },
        });
    },

    down: async queryInterface => {
        await queryInterface.dropTable('t_comments');
    },
};
