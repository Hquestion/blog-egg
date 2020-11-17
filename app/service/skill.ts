import { Service } from 'egg';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';
import { SkillType } from '../../typings';

export default class SkillService extends Service {
    public async list(userId: string) {
        const { ctx } = this;
        const where: {user?: string} = {};
        where.user = userId;
        return await ctx.model.Skill.findAll({
            where: {
                ...where,
                isDelete: '0',
            },
            order: [
                [ 'percent', 'DESC' ],
            ],
        });
    }

    public async createSkill(data: Partial<SkillType>) {
        const { ctx } = this;
        const params: Partial<SkillType> = {};
        params.uuid = uuid();
        params.createdAt = dayjs().format();
        params.updatedAt = dayjs().format();
        params.color = ctx.helper.getRandomColor();
        params.isDelete = '0';
        return await ctx.model.Skill.create({ ...params, ...data });
    }

    public async updateSkill(uuid: string, data: Partial<SkillType>) {
        const { ctx } = this;
        const params: Partial<SkillType> = {};
        params.updatedAt = dayjs().format();
        return await ctx.model.Skill.update({ ...params, ...data }, {
            where: { uuid },
        });
    }
}
