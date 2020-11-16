// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAuth from '../../../app/service/auth';
import ExportCategory from '../../../app/service/category';
import ExportComment from '../../../app/service/comment';
import ExportFavFolder from '../../../app/service/favFolder';
import ExportPosts from '../../../app/service/posts';
import ExportPostTag from '../../../app/service/postTag';
import ExportSeries from '../../../app/service/series';
import ExportStar from '../../../app/service/Star';
import ExportTag from '../../../app/service/tag';
import ExportTest from '../../../app/service/Test';
import ExportUsers from '../../../app/service/users';

declare module 'egg' {
  interface IService {
    auth: AutoInstanceType<typeof ExportAuth>;
    category: AutoInstanceType<typeof ExportCategory>;
    comment: AutoInstanceType<typeof ExportComment>;
    favFolder: AutoInstanceType<typeof ExportFavFolder>;
    posts: AutoInstanceType<typeof ExportPosts>;
    postTag: AutoInstanceType<typeof ExportPostTag>;
    series: AutoInstanceType<typeof ExportSeries>;
    star: AutoInstanceType<typeof ExportStar>;
    tag: AutoInstanceType<typeof ExportTag>;
    test: AutoInstanceType<typeof ExportTest>;
    users: AutoInstanceType<typeof ExportUsers>;
  }
}
