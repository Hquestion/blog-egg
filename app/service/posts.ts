import { Service } from 'egg';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import { CommentType, paginationType, PostType, UserType } from '../../typings';

declare type PostListOptions = {
    author: string,
    isDelete: boolean,
    isPublished: boolean
};

export default class PostService extends Service {
    public async list(name: string, pagination?: Partial<paginationType>, option?: Partial<PostListOptions>) {
        const { ctx, app } = this;
        const { Op } = app.Sequelize;
        const where: {name?: any, author?: string} = {};
        if (name) {
            where.name = { [Op.like]: name };
        }
        if (option && option.author) {
            where.author = option.author;
        }
        return await ctx.model.Post.findAndCountAll({
            where: {
                ...where,
                isDelete: option?.isDelete === true ? '1' : '0',
                isPublished: option?.isPublished === false ? '0' : '1',
            },
            include: [
                {
                    model: ctx.model.User,
                    as: 'user',
                },
            ],
            order: [
                [ 'createdAt', 'DESC' ],
            ],
            ...pagination,
        });
    }

    public async findPostById(uuid) {
        const { ctx } = this;
        const post = await ctx.model.Post.findByPk(uuid);
        const user = await ctx.model.User.findByPk(post.author);
        post.setDataValue('user', user);
        return post;
    }

    public async createPost(data) {
        const { ctx } = this;
        const model: Partial<PostType> = {};
        model.uuid = uuid();
        model.createdAt = dayjs().toISOString();
        model.updatedAt = dayjs().toISOString();
        return await ctx.model.Post.create({ ...model, ...data });
    }

    public async updatePost(uuid, data) {
        const { ctx } = this;
        const model: Partial<PostType> = {};
        model.updatedAt = dayjs().toISOString();
        return await ctx.model.Post.update({ ...model, ...data }, {
            where: {
                uuid,
            },
        });
    }

    public async addStar(uuid) {
        const { ctx } = this;
        const post = await ctx.model.Post.findByPk(uuid);
        const starCount = (post.star || 0) + 1;
        return await ctx.model.Post.update({ star: starCount }, {
            where: {
                uuid,
            },
        });
    }

    public async addPostComment(postId, userid, data: {content: string, commentId?: string}) {
        const { ctx } = this;
        const model: Partial<CommentType> = {};
        model.uuid = uuid();
        model.content = data.content || '';
        model.user = userid;
        model.post = postId;
        if (data.commentId) {
            model.comment = data.commentId;
        }
        model.createdAt = dayjs().toISOString();
        model.updatedAt = dayjs().toISOString();
        return await ctx.model.Comment.create(model);
    }

    public async getPostComments(uuid: string, pagination?: Partial<paginationType>) {
        const { ctx } = this;
        const comments = await ctx.model.Comment.findAll({
            where: { isDelete: '0', post: uuid },
            include: [
                {
                    model: ctx.model.User,
                    as: 'userMeta',
                },
                {
                    model: ctx.model.Post,
                    as: 'postMeta',
                },
                {
                    model: ctx.model.Comment,
                    as: 'commentMeta',
                },
            ],
            order: [
                [ 'createdAt', 'DESC' ],
            ],
            ...pagination,
        });
        if (!comments || comments.length === 0) {
            return [];
        }
        const users: UserType[] = await this.getCommentsUsers(comments);
        return comments.map((comment, index) => {
            comment.commentMeta && comment.commentMeta.setDataValue('userMeta', users[index]);
            return comment;
        });
    }

    private getCommentsUsers(comments): Promise<UserType[]> {
        const users: UserType[] = [];
        return new Promise(resolve => {
            let count = 0;
            for (let i = 0; i < comments.length; i++) {
                let promise;
                if (comments[i].commentMeta) {
                    promise = comments[i].commentMeta.getUserMeta();
                } else {
                    promise = Promise.resolve(null);
                }
                promise.then(data => {
                    users[i] = data;
                    // eslint-disable-next-line no-loop-func
                }).finally(() => {
                    count++;
                    if (count === comments.length) {
                        resolve(users);
                    }
                });
            }
        });
    }
}
