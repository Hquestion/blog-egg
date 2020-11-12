import { Service } from 'egg';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';
import { PostTagType } from '../../typings';

export default class PostTagService extends Service {
    public async createPostTag(postTagId: string, tagId: string) {
        const model: Partial<PostTagType> = {};
        model.uuid = uuid();
        model.postTag = postTagId;
        model.tag = tagId;
        model.createdAt = dayjs().toISOString();
        model.updatedAt = dayjs().toISOString();
        return await this.ctx.model.PostTag.create(model);
    }

    public async createPostTags(postTagId: string, tags: string[]) {
        let _resolve;
        let count = 0;
        for (let i = 0; i < tags.length; i++) {
            // eslint-disable-next-line no-loop-func
            this.createPostTag(postTagId, tags[i]).then(() => {
                count++;
                if (count === tags.length) _resolve();
                // eslint-disable-next-line no-loop-func
            }, () => {
                count++;
                if (count === tags.length) _resolve();
            });
        }
        return new Promise(resolve => {
            _resolve = resolve;
        });
    }
}
