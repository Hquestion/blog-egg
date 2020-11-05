import { Controller } from 'egg';
import { paginationType } from '../../typings';

export default class UserController extends Controller {
    public async index() {
        const { ctx } = this;
        const { query } = ctx.request;
        const page = +query.page || 1;
        const limit = +query.limit || -1;
        let pagination: paginationType | undefined;
        if (limit !== -1) {
            pagination = { start: page, limit };
        }
        ctx.body = await ctx.service.users.list(query.name || '', pagination);
    }


    public async create() {
        const { ctx } = this;
        const data = ctx.request.body;
        ctx.body = await ctx.service.users.createUser(data);
    }

    public async show() {
        const { ctx } = this;
        const id = ctx.params.id;
        ctx.body = await ctx.service.users.findUserById(id);
    }

    public async update() {
        const { ctx } = this;
        const data = ctx.request.body;
        const uuid = ctx.params.id;
        if (!uuid) throw new Error('uuid is required!');
        ctx.body = await ctx.service.users.updateUser(uuid, data);
    }

    public async destroy() {
        const { ctx } = this;
        const uuid = ctx.params.id;
        ctx.body = await ctx.service.users.updateUser(uuid, { isDelete: '1' });
    }

    public async getPosts() {
        const { ctx } = this;
        const id = ctx.params.id;
        const { query } = ctx.request;
        const page = +query.page || 1;
        const limit = +query.limit || -1;
        let pagination: paginationType | undefined;
        if (limit !== -1) {
            pagination = { start: page, limit };
        }
        this.ctx.body = await this.ctx.service.users.getPosts(id, query.title || '', pagination);
    }
}
