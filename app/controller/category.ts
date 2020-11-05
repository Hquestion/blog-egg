import { Controller } from 'egg';
import { paginationType } from '../../typings';

export default class CategoryController extends Controller {
    public async index() {
        const { ctx } = this;
        const { query } = ctx.request;
        const page = +query.page || 1;
        const limit = +query.limit || -1;
        let pagination: paginationType | undefined;
        if (limit !== -1) {
            pagination = { start: page, limit };
        }
        ctx.body = await ctx.service.category.list(query.title || '', pagination);
    }

    public async create() {
        const { ctx } = this;
        const data = ctx.request.body;
        ctx.body = await ctx.service.category.createCategory(data);
    }

    public async show() {
        const { ctx } = this;
        const id = ctx.params.id;
        ctx.body = await ctx.service.category.findCategoryById(id);
    }

    public async update() {
        const { ctx } = this;
        const data = ctx.request.body;
        const uuid = ctx.params.id;
        if (!uuid) throw new Error('uuid is required!');
        ctx.body = await ctx.service.category.updateCategory(uuid, data);
    }

    public async destroy() {
        const { ctx } = this;
        const uuid = ctx.params.id;
        ctx.body = await ctx.service.category.updateCategory(uuid, { isDelete: '1' });
    }
}
