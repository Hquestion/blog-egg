import * as fs from 'fs';
import * as path from 'path';
import { Controller } from 'egg';
import pump from 'mz-modules/pump';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';

export default class CommonController extends Controller {
    public async upload() {
        const { ctx, config } = this;
        const STATIC_RESOURCE_PREFIX = config.staticUrlPrefix;
        const files = ctx.request.files;
        ctx.logger.info('got %d files', ctx.request.files.length);
        const folderName = `/upload/${dayjs().format('YYYY-MM-DD')}/`;
        const absoluteFolderName = path.join(config.baseDir, 'app/public' + folderName);
        const hasFolder = fs.existsSync(absoluteFolderName);
        if (!hasFolder) {
            fs.mkdirSync(absoluteFolderName);
        }
        const fileTargetRelativePaths: string[] = [];

        try {
            for (const file of files) {
                const filename = file.filename.toLowerCase();
                const filenameList = filename.split('.');
                const ext = filenameList.slice(-1)[0];
                const randomFilename = dayjs().format('YYYY-MM-DD_HH-mm-ss') + '__' + uuid().slice(0, 10) + '.' + ext;
                const targetPath = path.join(absoluteFolderName, randomFilename);
                const source = fs.createReadStream(file.filepath);
                const target = fs.createWriteStream(targetPath);
                await pump(source, target);
                fileTargetRelativePaths.push(folderName + randomFilename);
                ctx.logger.warn('save %s to %s', file.filepath, targetPath);
            }
        } finally {
            // delete those request tmp files
            await ctx.cleanupRequestFiles();
        }

        const fields: Array<{key: any, value: any}> = [];
        for (const k in ctx.request.body) {
            fields.push({
                key: k,
                value: ctx.request.body[k],
            });
        }

        const absolutePaths = fileTargetRelativePaths.map(item => `${STATIC_RESOURCE_PREFIX}${item}`);
        ctx.status = 200;
        ctx.body = absolutePaths.length === 1 ? absolutePaths[0] : absolutePaths;
    }
}
