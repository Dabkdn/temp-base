import UserModel from '../../models/user.model';
import {
    IAdminLoginRequest,
    IResetPasswordRequest,
    IForgotPasswordResponse,
} from './auth.types';
import { IMessageResponse } from '../../types/response';
import { ILoginResponse } from './auth.types';
import {
    comparePassword,
    createResetPasswordToken,
    createHash,
} from '../../helper/password';
import { signAdminToken } from '../../helper/jwtToken';
import { ROLE } from '../../constants/role';

class AuthService {
    private userModel: UserModel;
    constructor() {
        this.userModel = new UserModel();
    }

    public login = (
        payload: IAdminLoginRequest
    ): Promise<ILoginResponse | IMessageResponse> => {
        return new Promise(async resolve => {
            const user = await this.userModel.findBy({ email: payload.email });
            if (!user) {
                return resolve({
                    message: 'User Not Found',
                    statusCode: 400,
                });
            }
            if (!comparePassword(payload.password, user.password)) {
                return resolve({
                    message: 'Password is invalid',
                    statusCode: 400,
                });
            }
            await this.userModel.update(user.id, {
                last_login: new Date(),
            });
            if (user.role_id === ROLE.ADMIN)
                return resolve({
                    token: signAdminToken(user.id),
                    message: 'success',
                    statusCode: 200,
                });
            else
                return resolve({
                    token: 'user token',
                    message: 'success',
                    statusCode: 200,
                });
        });
    };

    public forgotPassword = (
        email: string
    ): Promise<IForgotPasswordResponse | IMessageResponse> => {
        return new Promise(async resolve => {
            const user = await this.userModel.findBy({ email });
            if (!user) {
                return resolve({
                    message: 'User Not Found',
                    statusCode: 400,
                });
            }
            let resetPasswordToken;
            let isDuplicated = true;
            do {
                resetPasswordToken = createResetPasswordToken();
                const duplicateResetPasswordTokenFromDb = await this.userModel.findBy(
                    {
                        reset_password_token: resetPasswordToken,
                    }
                );
                if (!duplicateResetPasswordTokenFromDb) isDuplicated = false;
            } while (isDuplicated);
            const result = await this.userModel.update(user.id, {
                reset_password_token: resetPasswordToken,
            });
            if (!result) {
                return resolve({
                    message: 'Something wrong, please try again!',
                    statusCode: 400,
                });
            }
            return resolve({
                resetPasswordToken,
                message: 'success',
                statusCode: 200,
            });
        });
    };

    public resetPassword = (
        payload: IResetPasswordRequest
    ): Promise<IMessageResponse> => {
        return new Promise(async resolve => {
            const user = await this.userModel.findBy({
                reset_password_token: payload.resetPasswordToken,
            });
            if (!user) {
                return resolve({
                    message: 'User not found',
                    statusCode: 400,
                });
            }
            const newPassword = createHash(payload.password);
            const result = await this.userModel.update(user.id, {
                reset_password_token: null,
                password: newPassword,
            });
            if (!result) {
                return resolve({
                    message: 'Something wrong, please try again!',
                    statusCode: 400,
                });
            }
            return resolve({
                message: 'Success',
                statusCode: 200,
            });
        });
    };
}

export default AuthService;
