import { Service } from 'egg';
import { paginationType, CategoryType } from '../../typings';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';

export default class CategoryService extends Service {
    public async list(title: string, pagination?: Partial<paginationType>) {
        const { ctx, app } = this;
        const { Op } = app.Sequelize;
        const where: {title?: any} = {};
        if (title) {
            where.title = { [Op.like]: title };
        }
        return await ctx.model.Category.findAll({
            where: { ...where, isDelete: '0' },
            ...pagination,
        });
    }

    public async findCategoryById(uuid: string): Promise<Partial<CategoryType>> {
        const { ctx } = this;
        return await ctx.model.Category.findByPk(uuid);
    }

    public async createCategory(data: Partial<CategoryType>) {
        const { ctx } = this;
        const model: Partial<CategoryType> = {};
        model.uuid = uuid();
        model.createdAt = dayjs().format();
        model.updatedAt = dayjs().format();
        return await ctx.model.Category.create({ ...model, ...data });
    }

    public async updateCategory(uuid, data: Partial<CategoryType>) {
        const { ctx } = this;
        const model: Partial<CategoryType> = {};
        model.updatedAt = dayjs().format();
        return await ctx.model.Category.update({ ...model, ...data }, {
            where: {
                uuid,
            },
        });
    }
}
