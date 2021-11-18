import * as Hapi from '@hapi/hapi';
import AuthController from './auth.controller';
import validate from './auth.validate';
import Logger from '../../helper/logger';
import IRoute from '../../helper/route';
import { AUTH_NAMES } from '../../constants/auth';
const PREFIX = '/api/auth';
import {
    defaultRouteOptionResponseStatus,
    generalMessageResponse,
} from '../../helper/response';
import authResponse from './auth.response';

export default class AuthRoutes implements IRoute {
    public async register(server: Hapi.Server): Promise<any> {
        return new Promise(resolve => {
            Logger.info('AuthRoutes - Start adding auth routes');

            // Passing ID by constructor it's not neccesary as default value it's 'id'
            const controller = new AuthController();

            server.route([
                {
                    method: 'POST',
                    path: `${PREFIX}/login`,
                    options: {
                        handler: controller.login,
                        validate: validate.login,
                        description: 'Method that authenticate user',
                        tags: ['api', 'Authentication'],
                        auth: false,
                        response: {
                            status: {
                                ...defaultRouteOptionResponseStatus,
                                200: authResponse.login,
                            },
                        },
                    },
                },
                {
                    method: 'POST',
                    path: `${PREFIX}/forgot-password`,
                    options: {
                        handler: controller.forgotPassword,
                        validate: validate.forgotPassword,
                        description:
                            'Method that return reset password token to user',
                        tags: ['api', 'Authentication'],
                        auth: false,
                        response: {
                            status: {
                                ...defaultRouteOptionResponseStatus,
                                200: authResponse.forgotPassword,
                            },
                        },
                    },
                },
                {
                    method: 'POST',
                    path: `${PREFIX}/reset-password`,
                    options: {
                        handler: controller.resetPassword,
                        validate: validate.resetPassword,
                        description: 'Method that reset password for user',
                        tags: ['api', 'Authentication'],
                        auth: false,
                        response: {
                            status: {
                                ...defaultRouteOptionResponseStatus,
                                200: generalMessageResponse,
                            },
                        },
                    },
                },
            ]);

            Logger.info('AuthRoutes - Finish adding auth routes');
            resolve(true);
        });
    }
}
