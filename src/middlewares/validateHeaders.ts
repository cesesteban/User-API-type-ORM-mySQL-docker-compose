import { Request, Response, NextFunction } from 'express';
import { validate, ValidationError } from 'class-validator';
import { MESSAGE_INTERNAL_ERROR, NAMESPACE_API_SERVER, STATUS_CODE, STATUS_MESSAGE } from '../commons/statics';
import { ApiException } from '../handlers/ApiException';
import logging from '../configs/logging';

export function validateHeaders(validatorClass: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        req.headers = toCamelCase(req.headers);
        const headers = req.headers;
        try {
            const validatorInstance = new validatorClass();
            Object.assign(validatorInstance, headers);
            const errors = await validate(validatorInstance);

            if (errors.length > 0) {
                const validationErrors = errors.map((error: ValidationError) => Object.values(error.constraints || {}));
                res.status(STATUS_CODE.BAD_REQUEST).json({ result: validationErrors });
            } else {
                next();
            }
        } catch (error) {
            logging.error(NAMESPACE_API_SERVER, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - ERROR: ["${error}]`);
            return res.status(STATUS_CODE.INTERNAL_ERROR).json({ message: STATUS_MESSAGE.INTERNAL_ERROR });
        }
    };

    function toCamelCase(obj: any): any {
        const camelCaseObj: any = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const camelCaseKey = key.replace(/-([a-z])/g, (_, match) => match.toUpperCase());
                camelCaseObj[camelCaseKey] = obj[key];
            }
        }
        return camelCaseObj;
    }
}
