import { Service } from 'egg';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';

export default class StarService extends Service {
    public async createStar(postId, userid) {
        const { ctx } = this;
        const data: any = {};
        data.uuid = uuid();
        data.createdAt = dayjs().toISOString();
        data.updatedAt = dayjs().toISOString();
        data.user = userid;
        data.post = postId;
        return await ctx.model.Star.create(data);
    }

    public async isStar(postId, userId) {
        const { ctx, app } = this;
        const { Op } = app.Sequelize;
        const starMeta = await ctx.model.Star.findOne({
            where: {
                [Op.and]: [{
                    post: postId,
                }, {
                    user: userId,
                }, {
                    isDelete: '0',
                }],
            },
        });
        return !!starMeta;
    }
}
