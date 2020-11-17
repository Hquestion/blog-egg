import { Application } from 'egg';

export default (app: Application) => {
    const { controller, router } = app;

    router.get('/', controller.home.index);
    router.post('/api/v1/login', controller.auth.login);
    router.post('/api/v1/logout', controller.auth.logout);
    router.get('/api/v1/auth/redirect', controller.auth.githubLogin);

    router.resources('users', '/api/v1/users', controller.users);
    router.get('/api/v1/userInfo', controller.users.getUserInfo);
    router.get('/api/v1/users/:id/getPosts', controller.users.getPosts);
    router.get('/api/v1/users/:id/getDrafts', controller.users.getDrafts);
    router.get('/api/v1/users/:id/getSkills', controller.users.getSkills);
    router.get('/api/v1/getUserByName', controller.users.getUserInfoByName);

    router.resources('posts', '/api/v1/posts', controller.posts);
    router.post('/api/v1/posts/:uuid/comment', controller.posts.addPostComment);
    router.get('/api/v1/posts/:uuid/comments', controller.posts.getPostComments);

    router.resources('category', '/api/v1/category', controller.category);

    router.post('/api/v1/star/:uuid', controller.star.create);
    router.get('/api/v1/star/isStar/:uuid', controller.star.isStar);

    router.post('/api/v1/common/upload', controller.common.upload);

    router.resources('series', '/api/v1/series', controller.series);
    router.get('/api/v1/series/:id/posts', controller.series.getSeriesPosts);

    router.resources('favFolders', '/api/v1/favFolders', controller.favFolder);

    router.resources('tags', '/api/v1/tags', controller.tag);
};
