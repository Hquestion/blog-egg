import { Controller } from 'egg';

export default class SkillController extends Controller {
    public async index() {
        const { ctx } = this;
        const { query } = ctx.request;
        ctx.body = await ctx.service.skill.list(query.userId);
    }

    public async create() {
        const { ctx } = this;
        const data = ctx.request.body;
        const userId = ctx.locals.userid;
        data.isDelete = +!!+data.isDelete + '';
        ctx.body = await ctx.service.skill.createSkill({ ...data, user: userId });
    }

    public async destroy() {
        const { ctx } = this;
        const uuid = ctx.params.id;
        ctx.body = await ctx.service.skill.updateSkill(uuid, { isDelete: '1' });
    }
}
