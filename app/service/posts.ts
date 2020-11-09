import { Service } from 'egg';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import { paginationType, PostType } from '../../typings';

export default class PostService extends Service {
    public async list(name: string, pagination?: Partial<paginationType>) {
        const { ctx, app } = this;
        const { Op } = app.Sequelize;
        const where: {name?: any} = {};
        if (name) {
            where.name = { [Op.like]: name };
        }
        return await ctx.model.Post.findAll({
            where: { isDelete: '0' },
            ...pagination,
        });
    }

    public async findPostById(uuid) {
        const { ctx } = this;
        return await ctx.model.Post.findByPk(uuid);
    }

    public async createPost(data) {
        const { ctx } = this;
        const model: Partial<PostType> = {};
        model.uuid = uuid();
        model.createdAt = dayjs().format();
        model.updatedAt = dayjs().format();
        return await ctx.model.Post.create({ ...model, ...data });
    }

    public async updatePost(uuid, data) {
        const { ctx } = this;
        const model: Partial<PostType> = {};
        model.updatedAt = dayjs().format();
        return await ctx.model.Post.update({ ...model, ...data }, {
            where: {
                uuid,
            },
        });
    }
}
