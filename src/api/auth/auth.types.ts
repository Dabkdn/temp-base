export interface IAdminLoginRequest {
    email: string;
    password: string;
}

export interface IForgotPasswordRequest {
    email: string;
}

export interface IResetPasswordRequest {
    resetPasswordToken: string;
    password: string;
    confirmedPassword: string;
}

export interface IForgotPasswordResponse {
    resetPasswordToken: string;
    message: string;
    statusCode?: number;
}

export interface ILoginResponse {
    token: string;
    message: string;
    statusCode?: number;
}
