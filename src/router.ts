import * as Hapi from '@hapi/hapi';
import Logger from './helper/logger';
import AuthRoutes from './api/auth/auth.routes';

export default class Router {
    public static async loadRoutes(server: Hapi.Server): Promise<any> {
        Logger.info('Router - Start adding routes');
        await new AuthRoutes().register(server);
        Logger.info('Router - Finish adding routes');
    }
}
