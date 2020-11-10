module.exports = app => {
    const { STRING } = app.Sequelize;

    const PostTag = app.model.define('t_post_tags', {
        uuid: { primaryKey: true, type: STRING(30), allowNull: false },
        postTag: { type: STRING(30), field: 'post_tag_id', allowNull: false },
        tag: { type: STRING(30), field: 'tag_id', allowNull: false },
        isDelete: { type: STRING(1), defaultValue: '0', field: 'is_delete' },
        createdAt: { type: STRING(30), field: 'created_at' },
        updatedAt: { type: STRING(30), field: 'updated_at' },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    PostTag.associate = function() {
        app.model.PostTag.belongsTo(app.model.Tag, { as: 'tagMeta', foreignKey: 'tag_id' });
    };

    return PostTag;
};
