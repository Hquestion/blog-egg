import { Controller } from 'egg';
import { v4 as uuid } from 'uuid';
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
        const userId = ctx.locals.userid;
        data.isPublished = +!!+data.isPublished + '';
        data.isDelete = +!!+data.isDelete + '';
        ctx.body = await ctx.service.posts.createPost({ ...data, author: userId });
    }

    public async show() {
        const { ctx } = this;
        const id = ctx.params.id;
        ctx.body = await ctx.service.posts.findPostById(id);
    }

    public async update() {
        const { ctx } = this;
        const data = ctx.request.body;
        const postId = ctx.params.id;
        if (!postId) throw new Error('postId is required!');
        let { tags } = data;
        if (tags) {
            tags = [ ...new Set(tags) ];
            if (tags && tags.length >= 1) {
                const postTagId = uuid();
                await ctx.service.postTag.createPostTags(postTagId, tags);
                data.postTag = postTagId;
            }
            delete data.tags;
        }
        ctx.body = await ctx.service.posts.updatePost(postId, data);
    }

    public async destroy() {
        const { ctx } = this;
        const uuid = ctx.params.id;
        ctx.body = await ctx.service.posts.updatePost(uuid, { isDelete: '1' });
    }

    public async starIncrease() {
        const { ctx } = this;
        const uuid = ctx.params.id;
        ctx.body = await ctx.service.posts.addStar(uuid);
    }

    public async addPostComment() {
        const { ctx } = this;
        const uuid = ctx.params.uuid;
        const payload = ctx.request.body;
        const userid = ctx.locals.userid;
        ctx.body = await ctx.service.posts.addPostComment(uuid, userid, payload);
    }

    public async getPostComments() {
        const { ctx } = this;
        const uuid = ctx.params.uuid;
        const query = ctx.request.query;
        const pagination: Partial<paginationType> = generatePagination(query);
        ctx.body = await ctx.service.posts.getPostComments(uuid, pagination);
    }
}
