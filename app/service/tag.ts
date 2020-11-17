import { Service } from 'egg';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';
import { paginationType, TagType } from '../../typings';

export default class TagService extends Service {
    public async list(title: string, pagination?: Partial<paginationType>, options?: { userId: string }) {
        const { ctx, app } = this;
        const { Op } = app.Sequelize;
        const where: {title?: any, user?: string} = {};
        if (title) {
            where.title = { [Op.like]: title };
        }
        if (options?.userId) {
            where.user = options.userId;
        }
        return await ctx.model.Tag.findAll({
            where: {
                ...where,
                isDelete: '0',
            },
            include: [
                {
                    model: ctx.model.PostTag,
                    as: 'postTags',
                    attributes: [ 'uuid', 'postTag' ],
                    include: [
                        { model: ctx.model.Post, as: 'post', attributes: [ 'uuid' ] },
                    ],
                },
            ],
            order: [
                [ 'createdAt', 'DESC' ],
            ],
            ...pagination,
        });
    }

    public async findTagById(uuid: string) {
        return await this.ctx.model.Tag.findByPk(uuid);
    }

    public async createTag(data: Partial<TagType>) {
        const { ctx } = this;
        const params: Partial<TagType> = {};
        params.uuid = uuid();
        params.createdAt = dayjs().format();
        params.updatedAt = dayjs().format();
        params.isDelete = '0';
        return await ctx.model.Tag.create({ ...params, ...data });
    }

    public async updateTag(uuid: string, data: Partial<TagType>) {
        const { ctx } = this;
        const params: Partial<TagType> = {};
        params.updatedAt = dayjs().format();
        return await ctx.model.Tag.update({ ...params, ...data }, {
            where: { uuid },
        });
    }

    public async getUser(uuid: string) {
        return await this.ctx.model.Tag.getUserMeta(uuid);
    }
}
