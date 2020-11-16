// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuth from '../../../app/controller/auth';
import ExportCategory from '../../../app/controller/category';
import ExportCommon from '../../../app/controller/common';
import ExportFavFolder from '../../../app/controller/favFolder';
import ExportHome from '../../../app/controller/home';
import ExportPosts from '../../../app/controller/posts';
import ExportSeries from '../../../app/controller/series';
import ExportStar from '../../../app/controller/star';
import ExportUsers from '../../../app/controller/users';

declare module 'egg' {
  interface IController {
    auth: ExportAuth;
    category: ExportCategory;
    common: ExportCommon;
    favFolder: ExportFavFolder;
    home: ExportHome;
    posts: ExportPosts;
    series: ExportSeries;
    star: ExportStar;
    users: ExportUsers;
  }
}
