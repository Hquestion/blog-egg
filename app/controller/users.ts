import { Controller } from 'egg';
import { paginationType } from '../../typings';
import { generatePagination } from '../extend/helper';

export default class UserController extends Controller {
    public async index() {
        const { ctx } = this;
        const { query } = ctx.request;
        const page = +query.page || 1;
        const limit = +query.limit || -1;
        let pagination: paginationType | undefined;
        if (limit !== -1) {
            pagination = { start: (page - 1) * limit, limit };
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

    public async getUserInfo() {
        const { ctx } = this;
        const uuid = ctx.locals.userid;
        if (uuid) {
            ctx.body = await ctx.service.users.findUserById(uuid);
        } else {
            ctx.status = 401;
            ctx.body = { msg: '' };
        }
    }

    public async getUserInfoByName() {
        const { ctx } = this;
        const { username } = ctx.request.query;
        ctx.body = await ctx.service.users.findUserByUsername(username);
    }

    public async getPosts() {
        const { ctx } = this;
        const id = ctx.params.id;
        const { query } = ctx.request;
        const pagination: Partial<paginationType> = generatePagination(query);
        this.ctx.body = await this.ctx.service.users.getPosts(id, true, query.title || '', pagination);
    }

    public async getDrafts() {
        const { ctx } = this;
        const id = ctx.params.id;
        const { query } = ctx.request;
        const pagination: Partial<paginationType> = generatePagination(query);
        this.ctx.body = await this.ctx.service.users.getPosts(id, false, query.title || '', pagination);
    }

    public async getSkills() {
        const { ctx } = this;
        const id = ctx.params.id;
        this.ctx.body = await ctx.service.skill.list(id);
    }
}
