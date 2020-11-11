import { Controller } from 'egg';

export default class StarController extends Controller {
    public async create() {
        const { ctx } = this;
        const postId = ctx.params.uuid;
        const userid = ctx.locals.userid;
        const res = await ctx.service.star.createStar(postId, userid);
        await ctx.service.posts.addStar(postId);
        ctx.body = res;
    }

    public async isStar() {
        const { ctx } = this;
        const userid = ctx.locals.userid;
        const postId = ctx.params.uuid;
        const isStarred = await ctx.service.star.isStar(postId, userid);
        ctx.status = isStarred ? 204 : 500;
    }
}
