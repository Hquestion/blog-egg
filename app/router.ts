import { Application } from 'egg';

export default (app: Application) => {
    const { controller, router } = app;

    router.get('/', controller.home.index);
    router.post('/api/v1/login', controller.auth.login);
    router.post('/api/v1/logout', controller.auth.logout);

    router.resources('users', '/api/v1/users', controller.users);
    router.get('/api/v1/userInfo', controller.users.getUserInfo);
    router.get('/api/v1/users/:id/getPosts', controller.users.getPosts);

    router.resources('posts', '/api/v1/posts', controller.posts);
    router.post('/api/v1/posts/:uuid/comment', controller.posts.addPostComment);
    router.get('/api/v1/posts/:uuid/comments', controller.posts.getPostComments);

    router.resources('category', '/api/v1/category', controller.category);

    router.post('/api/v1/star/:uuid', controller.star.create);
    router.get('/api/v1/star/isStar/:uuid', controller.star.isStar);

    router.post('/api/v1/common/upload', controller.common.upload);
};
