import { Service } from 'egg';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';
import { paginationType, SeriesType } from '../../typings';

export default class SeriesService extends Service {
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
        return await ctx.model.Series.findAll({
            where: {
                ...where,
                isDelete: '0',
            },
            include: [
                { model: ctx.model.Post, as: 'postList', attributes: [ 'uuid', 'title' ] },
            ],
            order: [
                [ 'createdAt', 'DESC' ],
            ],
            ...pagination,
        });
    }

    public async findSeriesById(uuid: string) {
        const { ctx } = this;
        return await ctx.model.Series.findByPk(uuid, {
            include: [
                {
                    model: ctx.model.Post,
                    as: 'postList',
                    where: {
                        isDelete: '0',
                        isPublished: '1',
                    },
                    required: false,
                },
            ],
        });
    }

    public async createSeries(data: Partial<SeriesType>) {
        const { ctx } = this;
        const params: Partial<SeriesType> = {};
        params.uuid = uuid();
        params.createdAt = dayjs().format();
        params.updatedAt = dayjs().format();
        params.isDelete = '0';
        return await ctx.model.Series.create({ ...params, ...data });
    }

    public async updateSeries(uuid: string, data: Partial<SeriesType>) {
        const { ctx } = this;
        const params: Partial<SeriesType> = {};
        params.updatedAt = dayjs().format();
        return await ctx.model.Series.update({ ...params, ...data }, {
            where: { uuid },
        });
    }

    public async getUser(uuid: string) {
        return await this.ctx.model.Series.getUserMeta(uuid);
    }

    public async getSeriesPosts(uuid: string) {
        return await this.ctx.model.Series.getPostList(uuid);
    }
}
