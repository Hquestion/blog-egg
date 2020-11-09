import { Controller } from 'egg';
import { paginationType } from '../../typings';
import { generatePagination } from '../extend/helper';

export default class PostController extends Controller {
    public async index() {
        const { ctx } = this;
        const { query } = ctx.request;
        const pagination: Partial<paginationType> = generatePagination(query);
        ctx.body = await ctx.service.posts.list(query.name || '', pagination);
    }

    public async create() {
        const { ctx } = this;
        const data = ctx.request.body;
        ctx.body = await ctx.service.posts.createPost(data);
    }

    public async show() {
        const { ctx } = this;
        const id = ctx.params.id;
        ctx.body = await ctx.service.posts.findPostById(id);
    }

    public async update() {
        const { ctx } = this;
        const data = ctx.request.body;
        const uuid = ctx.params.id;
        if (!uuid) throw new Error('uuid is required!');
        ctx.body = await ctx.service.posts.updatePost(uuid, data);
    }

    public async destroy() {
        const { ctx } = this;
        const uuid = ctx.params.id;
        ctx.body = await ctx.service.posts.updatePost(uuid, { isDelete: '1' });
    }
}
