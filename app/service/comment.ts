import { Service } from 'egg';
import { paginationType, CommentType } from '../../typings';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';

export default class CommentService extends Service {
    public async list(page: paginationType) {
        const { ctx } = this;
        const where: {title?: any, limit?: number, offset?: number} = {};
        if (page && page.limit && page.limit === -1) {
            where.limit = page.limit;
            where.offset = page.start || 1;
        }
        return await ctx.model.Comment.findAll({ where: { where, isDelete: '0' } });
    }

    public async findCommentById(uuid) {
        const { ctx } = this;
        return await ctx.model.Comment.findByPk(uuid);
    }

    public async createComment(data: Partial<CommentType>) {
        const { ctx } = this;
        const params: Partial<CommentType> = {};
        params.uuid = uuid();
        params.content = data.content || '';
        params.user = data.userId;
        params.post = data.postId;
        if (data.commentId) {
            params.comment = data.commentId;
        }
        params.createdAt = dayjs().format();
        params.updatedAt = dayjs().format();
        params.isDelete = '0';
        return await ctx.model.Comment.create(params);
    }

    public async updateComment(uuid: string, data: Partial<CommentType>) {
        const { ctx } = this;
        const params: Partial<CommentType> = {};
        if (data.content) {
            params.content = data.content;
        }
        params.updatedAt = dayjs().format();
        params.isDelete = data.isDelete || '0';
        return await ctx.model.Comment.update(params, {
            where: { uuid },
        });
    }

    public async getUser(uuid: string) {
        const { ctx } = this;
        return await ctx.model.Comment.getUserMeta(uuid);
    }

    public async getPost(uuid: string) {
        const { ctx } = this;
        return await ctx.model.Comment.getPostMeta(uuid);
    }

    public async getParentComment(uuid: string) {
        return await this.ctx.model.Comment.getCommentMeta(uuid);
    }
}
