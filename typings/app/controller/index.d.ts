// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuth from '../../../app/controller/auth';
import ExportCategory from '../../../app/controller/category';
import ExportHome from '../../../app/controller/home';
import ExportPosts from '../../../app/controller/posts';
import ExportUsers from '../../../app/controller/users';

declare module 'egg' {
  interface IController {
    auth: ExportAuth;
    category: ExportCategory;
    home: ExportHome;
    posts: ExportPosts;
    users: ExportUsers;
  }
}
