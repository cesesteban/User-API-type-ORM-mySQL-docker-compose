import { Request, Response, NextFunction } from 'express';
import { validate, ValidationError } from 'class-validator';
import { INTERNAL_ERROR_MESSAGE, STATUS_CODE } from '../commons/statics';

export function validateRequest(validatorClass: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        req.body = toCamelCase(req.body);
        const body = req.body;
        try {
            const validatorInstance = new validatorClass();
            Object.assign(validatorInstance, body);
            const errors = await validate(validatorInstance);

            if (errors.length > 0) {
                const validationErrors = errors.map((error: ValidationError) => Object.values(error.constraints || {}));
                res.status(STATUS_CODE.BAD_REQUEST).json({ result: validationErrors });
            } else {
                next();
            }
        } catch (error) {
            res.status(STATUS_CODE.INTERNAL_ERROR).json({ result: INTERNAL_ERROR_MESSAGE });
        }
    };
}

export default function toCamelCase(obj: any): any {
    const camelCaseObj: any = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const camelCaseKey = key.replace(/_([a-z])/g, (_, match) => match.toUpperCase());
            camelCaseObj[camelCaseKey] = obj[key];
        }
    }
    return camelCaseObj;
}
