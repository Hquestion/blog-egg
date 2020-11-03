import { Application } from 'egg';

export default (app: Application) => {
    const { controller, router } = app;

    router.get('/', controller.home.index);
    router.post('/login', controller.auth.login);
    router.post('/logout', controller.auth.logout);
};
