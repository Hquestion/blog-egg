// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportStar from '../../../app/service/Star';
import ExportTest from '../../../app/service/Test';
import ExportAuth from '../../../app/service/auth';
import ExportCategory from '../../../app/service/category';
import ExportComment from '../../../app/service/comment';
import ExportFavFolder from '../../../app/service/favFolder';
import ExportPostTag from '../../../app/service/postTag';
import ExportPosts from '../../../app/service/posts';
import ExportSeries from '../../../app/service/series';
import ExportSkill from '../../../app/service/skill';
import ExportTag from '../../../app/service/tag';
import ExportUsers from '../../../app/service/users';

declare module 'egg' {
  interface IService {
    star: AutoInstanceType<typeof ExportStar>;
    test: AutoInstanceType<typeof ExportTest>;
    auth: AutoInstanceType<typeof ExportAuth>;
    category: AutoInstanceType<typeof ExportCategory>;
    comment: AutoInstanceType<typeof ExportComment>;
    favFolder: AutoInstanceType<typeof ExportFavFolder>;
    postTag: AutoInstanceType<typeof ExportPostTag>;
    posts: AutoInstanceType<typeof ExportPosts>;
    series: AutoInstanceType<typeof ExportSeries>;
    skill: AutoInstanceType<typeof ExportSkill>;
    tag: AutoInstanceType<typeof ExportTag>;
    users: AutoInstanceType<typeof ExportUsers>;
  }
}
