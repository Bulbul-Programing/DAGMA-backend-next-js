import express from 'express';
import { userRouter } from '../modules/user/user.routes';
import { loginRoute } from '../modules/auth/auth.routes';
import { resetPasswordRoute } from '../modules/resetPassword/resetPassword.routes';

const router = express.Router()

const moduleRoutes = [
    {
        path: '/user',
        route : userRouter
    },
    {
        path : '/auth',
        route : loginRoute
    },
    {
        path : '/resetPassword',
        route : resetPasswordRoute
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;