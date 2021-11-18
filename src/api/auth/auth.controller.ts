import AuthService from './auth.service';
import { Request, ResponseToolkit } from '@hapi/hapi';
import {
    IAdminLoginRequest,
    IForgotPasswordRequest,
    IResetPasswordRequest,
} from './auth.types';

export default class AuthController {
    private authService: AuthService;
    constructor() {
        this.authService = new AuthService();
    }

    public login = async (
        req: Request & { payload: IAdminLoginRequest },
        toolkit: ResponseToolkit
    ) => {
        const payload = req.payload;
        const response = await this.authService.login(payload);
        return toolkit.response(response).code(response.statusCode ?? 200);
    };

    public forgotPassword = async (
        req: Request & { payload: IForgotPasswordRequest },
        toolkit: ResponseToolkit
    ) => {
        const payload = req.payload;
        const response = await this.authService.forgotPassword(payload.email);
        return toolkit.response(response).code(response.statusCode ?? 200);
    };

    public resetPassword = async (
        req: Request & { payload: IResetPasswordRequest },
        toolkit: ResponseToolkit
    ) => {
        const payload = req.payload;
        const response = await this.authService.resetPassword(payload);
        return toolkit.response(response).code(response.statusCode ?? 200);
    };
}
