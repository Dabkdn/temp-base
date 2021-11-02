import { IResponseCommon } from '../helper/response';

export const SOL_PRICE = 0.5;

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

export const UPLOAD_STATUSES = {
    PENDING: 0,
    COMPLETED: 1,
    FAILED: 2,
};
