import { Service } from 'egg';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';
import { paginationType, FavFolderType } from '../../typings';

export default class FavFolderService extends Service {
    public async list(title: string, pagination?: Partial<paginationType>, options?: {userId: string}) {
        const { ctx, app } = this;
        const { Op } = app.Sequelize;
        const where: {title?: any, user?: string} = {};
        if (title) {
            where.title = { [Op.like]: title };
        }
        if (options?.userId) {
            where.user = options.userId;
        }
        return await ctx.model.FavFolder.findAll({
            where: {
                ...where,
                isDelete: '0',
            },
            include: [
                { model: ctx.model.Fav, as: 'favList', attributes: [ 'uuid', 'title' ] },
            ],
            order: [
                [ 'createdAt', 'DESC' ],
            ],
            ...pagination,
        });
    }

    public async findFavFolderById(uuid: string) {
        const { ctx } = this;
        return await ctx.model.FavFolder.findByPk(uuid, {
            include: [
                {
                    model: ctx.model.Fav,
                    as: 'favList',
                    where: {
                        isDelete: '0',
                    },
                    required: false,
                },
            ],
        });
    }

    public async createFavFolder(data: Partial<FavFolderType>) {
        const { ctx } = this;
        const params: Partial<FavFolderType> = {};
        params.uuid = uuid();
        params.createdAt = dayjs().format();
        params.updatedAt = dayjs().format();
        params.isDelete = '0';
        return await ctx.model.FavFolder.create({ ...params, ...data });
    }

    public async updateFavFolder(uuid: string, data: Partial<FavFolderType>) {
        const { ctx } = this;
        const params: Partial<FavFolderType> = {};
        params.updatedAt = dayjs().format();
        return await ctx.model.FavFolder.update({ ...params, ...data }, {
            where: { uuid },
        });
    }

    public async getUser(uuid: string) {
        return await this.ctx.model.FavFolder.getUserMeta(uuid);
    }

    public async getFavs(uuid: string) {
        return await this.ctx.model.FavFolder.getFavList(uuid);
    }
}
