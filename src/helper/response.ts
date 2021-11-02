import * as Boom from '@hapi/boom';
import * as Hapi from '@hapi/hapi';
import {head} from 'lodash';
import * as Joi from '@hapi/joi';

interface IResponseMeta {
    operation?: string;
    method?: string;
    paging?: string | null;
}

interface IResponseError {
    code?: string | number;
    message?: string;
    error?: string;
}

interface IResponse<T> {
    meta: IResponseMeta;
    data: T[];
    errors: IResponseError[];
}

interface IResponseOptions<T> {
    value?: T | null | undefined;
    boom?: Boom.Boom<any> | null | undefined;
}

export default function createResponse<T>(
    request: Hapi.Request,
    { value = null, boom = null }: IResponseOptions<T>
): IResponse<T> {
    const errors: IResponseError[] = [];
    const data: any = [];

    if (boom) {
        errors.push({
            code: boom.output.payload.statusCode,
            error: boom.output.payload.error,
            message: boom.output.payload.message,
        });
    }

    if (value && data) {
        if (Array.isArray(value)) {
            data.push(...value);
        } else {
            data.push(value);
        }
    }

    return {
        meta: {
            method: request.method.toUpperCase(),
            operation: request.url.pathname,
            paging: null,
        },
        data,
        errors,
    };
}

export interface IResponseCommon {
    statusCode: number;
    error: string;
    message: string;
}


interface IValidationErrorResponse {
    name: string;
    message: string;
}

export const formatErrorMessage = (data: any[]) => {
    const res: IValidationErrorResponse[] = [];
    data.forEach((error) => {
        if (error.type !== 'object.unknown') {
            res.push({
                name: head(error.path) ?? 'unknown',
                message: error.message,
            });
        }
    });
    return res;
};

export const validationMessageResponse = Joi.object({
    statusCode: Joi.number(),
    message: Joi.string(),
    errors: Joi.array().items(Joi.object({
        name: Joi.string(),
        message: Joi.string(),
    })),
    error: Joi.any()
}) as any;

export const generalMessageResponse = Joi.object({
    statusCode: Joi.number(),
    message: Joi.string(),
}) as any;

export const errorMessageResponse = Joi.object({
    statusCode: Joi.number(),
    message: Joi.string(),
    error: Joi.string()
}) as any;

export const defaultRouteOptionResponseStatus = {
    400: validationMessageResponse,
    401: errorMessageResponse,
    500: errorMessageResponse,
};
