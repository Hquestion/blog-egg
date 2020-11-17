// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCategory from '../../../app/model/Category';
import ExportComment from '../../../app/model/Comment';
import ExportFav from '../../../app/model/Fav';
import ExportFavFolder from '../../../app/model/FavFolder';
import ExportPost from '../../../app/model/Post';
import ExportPostTag from '../../../app/model/PostTag';
import ExportSeries from '../../../app/model/Series';
import ExportSkill from '../../../app/model/Skill';
import ExportStar from '../../../app/model/Star';
import ExportTag from '../../../app/model/Tag';
import ExportUser from '../../../app/model/User';

declare module 'egg' {
  interface IModel {
    Category: ReturnType<typeof ExportCategory>;
    Comment: ReturnType<typeof ExportComment>;
    Fav: ReturnType<typeof ExportFav>;
    FavFolder: ReturnType<typeof ExportFavFolder>;
    Post: ReturnType<typeof ExportPost>;
    PostTag: ReturnType<typeof ExportPostTag>;
    Series: ReturnType<typeof ExportSeries>;
    Skill: ReturnType<typeof ExportSkill>;
    Star: ReturnType<typeof ExportStar>;
    Tag: ReturnType<typeof ExportTag>;
    User: ReturnType<typeof ExportUser>;
  }
}
