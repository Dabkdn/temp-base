import { IResponseCommon } from '../helper/response';

export const responseError: IResponseCommon = {
    statusCode: 500,
    error: 'Internal Server Error',
    message: 'An error occurred, please try again later',
};

export const responseSuccess: IResponseCommon = {
    statusCode: 200,
    error: '',
    message: 'Your action is successful',
};
