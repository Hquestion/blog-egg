import { Controller } from 'egg';
import { paginationType } from '../../typings';
import { generatePagination } from '../extend/helper';

export default class TagController extends Controller {
    public async index() {
        const { ctx } = this;
        const { query } = ctx.request;
        const pagination: Partial<paginationType> = generatePagination(query);
        let options: {userId: string} | undefined;
        if (query.userId) {
            options = {
                userId: query.userId,
            };
        }
        ctx.body = await ctx.service.tag.list(query.name || '', pagination, options);
    }

    public async create() {
        const { ctx } = this;
        const data = ctx.request.body;
        const userId = ctx.locals.userid;
        data.isDelete = +!!+data.isDelete + '';
        ctx.body = await ctx.service.tag.createTag({ ...data, user: userId });
    }

    public async show() {
        const { ctx } = this;
        const id = ctx.params.id;
        ctx.body = await ctx.service.tag.findTagById(id);
    }

    public async destroy() {
        const { ctx } = this;
        const uuid = ctx.params.id;
        ctx.body = await ctx.service.tag.updateTag(uuid, { isDelete: '1' });
    }

    public async getSeriesPosts() {
        const { ctx } = this;
        const uuid = ctx.params.id;
        ctx.body = await ctx.service.series.getSeriesPosts(uuid);
    }
}
