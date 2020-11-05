import { Service } from 'egg';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';
import { paginationType, TagType } from '../../typings';

export default class TagService extends Service {
    public async list(title: string, page?: paginationType) {
        const { ctx, app } = this;
        const { Op } = app.Sequelize;
        const where: {title?: any, limit?: number, offset?: number} = {};
        if (title) {
            where.title = { [Op.like]: title };
        }
        if (page && page.limit && page.limit === -1) {
            where.limit = page.limit;
            where.offset = page.start || 1;
        }
        return await ctx.model.Tag.findAll({ where: { where, isDelete: '0' } });
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
        return await ctx.model.Tag.create({ ...params, ...data }, {
            where: { uuid },
        });
    }

    public async getUser(uuid: string) {
        return await this.ctx.model.Tag.getUserMeta(uuid);
    }
}
