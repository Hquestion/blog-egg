import { Application } from 'egg';

export default (app: Application) => {
    const { controller, router } = app;

    router.get('/', controller.home.index);
    router.post('/api/v1/login', controller.auth.login);
    router.post('/api/v1/logout', controller.auth.logout);

    router.resources('users', '/api/v1/users', controller.users);
    router.get('/api/v1/users/:id/getPosts', controller.users.getPosts);

    router.resources('posts', '/api/v1/posts', controller.posts);

    router.resources('posts', '/api/v1/category', controller.category);
};
