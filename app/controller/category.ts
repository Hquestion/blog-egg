import { Controller } from 'egg';
import { paginationType } from '../../typings';
import { generatePagination } from '../extend/helper';

export default class CategoryController extends Controller {
    public async index() {
        const { ctx } = this;
        const { query } = ctx.request;
        const pagination: Partial<paginationType> = generatePagination(query);
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
