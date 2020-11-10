module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
       * Add altering commands here.
       *
       * Example:
       * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
       */
        const { INTEGER, STRING } = Sequelize;
        await queryInterface.createTable('t_users', {
            uuid: { type: STRING(50), primaryKey: true },
            name: STRING(30),
            age: INTEGER,
            gender: { type: STRING(1), defaultValue: '3' },
            nickname: STRING(30),
            avatar: STRING(200),
            email: STRING(30),
            phone: STRING(20),
            password: STRING(100),
            wechat: STRING(30),
            openid: STRING(30),
            unionid: STRING(30),
            isDelete: { type: STRING(1), defaultValue: '0', field: 'is_delete' },
            isAdmin: { type: STRING(1), defaultValue: '0', field: 'is_admin' },
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
        await queryInterface.dropTable('t_users');
    },
};
