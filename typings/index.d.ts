import 'egg';
import ExportUser from '../model/User';
import ExportPost from '../model/Post';
import ExportCategory from '../model/Category';
import ExportComment from '../model/Comment';
import ExportFav from '../model/Fav';
import ExportFavFolder from '../model/FavFolder';
import ExportPostTag from '../model/PostTag';
import ExportSeries from '../model/Series';
import ExportStar from '../model/Star';
import ExportTag from '../model/Tag';

declare module 'egg' {

}

export type paginationType = { start: number, limit: number };
export type UserType = ReturnType<typeof ExportUser>;
export type PostType = ReturnType<typeof ExportPost>;
export type CategoryType = ReturnType<typeof ExportCategory>;
export type CommentType = ReturnType<typeof ExportComment>;
export type FavType = ReturnType<typeof ExportFav>;
export type FavFolderType = ReturnType<typeof ExportFavFolder>;
export type PostTagType = ReturnType<typeof ExportPostTag>;
export type SeriesType = ReturnType<typeof ExportSeries>;
export type StarType = ReturnType<typeof ExportStar>;
export type TagType = ReturnType<typeof ExportTag>;

