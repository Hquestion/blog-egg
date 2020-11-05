import { Service } from 'egg';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';
import { paginationType, SeriesType } from '../../typings';

export default class SeriesService extends Service {
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
        return await ctx.model.Series.findAll({ where: { where, isDelete: '0' } });
    }

    public async findSeriesById(uuid: string) {
        return await this.ctx.model.Series.findByPk(uuid);
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
        return await ctx.model.Series.create({ ...params, ...data }, {
            where: { uuid },
        });
    }

    public async getUser(uuid: string) {
        return await this.ctx.model.Series.getUserMeta(uuid);
    }
}
