import { Service } from 'egg';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import { paginationType, UserType } from '../../typings';

export default class UserService extends Service {
    public async list(name: string, pagination?: Partial<paginationType>) {
        const { ctx, app } = this;
        const { Op } = app.Sequelize;
        const where: {name?: any, limit?: number, offset?: number} = {};
        if (name) {
            where.name = { [Op.like]: name };
        }
        return await ctx.model.User.findAll({
            where: { where, isDelete: '0' },
            ...pagination,
        });
    }

    public async findUserById(uuid) {
        const { ctx } = this;
        return await ctx.model.User.findByPk(uuid);
    }

    public async createUser(data) {
        const { ctx } = this;
        const model: Partial<UserType> = {};
        model.uuid = uuid();
        model.createdAt = dayjs().format();
        model.updatedAt = dayjs().format();
        return await ctx.model.User.create({ ...model, ...data });
    }

    public async updateUser(uuid, data) {
        const { ctx } = this;
        const model: Partial<UserType> = {};
        model.updatedAt = dayjs().format();
        return await ctx.model.User.update({ ...model, ...data }, {
            where: {
                uuid,
            },
        });
    }

    public async getPosts(uuid: string, title?: string, page?: paginationType) {
        const { app } = this;
        const { Op } = app.Sequelize;
        const where: {title?: any, limit?: number, offset?: number} = {};
        if (title) {
            where.title = { [Op.like]: title };
        }
        if (page && page.limit && page.limit === -1) {
            where.limit = page.limit;
            where.offset = page.start || 1;
        }
        const user = await this.findUserById(uuid);
        return await user.getPosts({ where: { where, isDelete: '0' } });
    }

    public async findUserByUsername(username) {
        const { app, ctx } = this;
        const { Op } = app.Sequelize;
        return await ctx.model.User.findOne({
            where: {
                [Op.or]: [{
                    name: username,
                }, {
                    email: username,
                }, {
                    phone: username,
                }],
            },
        });
    }
}
