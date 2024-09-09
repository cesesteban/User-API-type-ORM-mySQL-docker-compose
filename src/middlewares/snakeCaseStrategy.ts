import { Request, Response, NextFunction } from 'express';
import { convertObjectKeysToSnakeCase } from '../commons/utils';

export const snakeCaseStrategy = (req: Request, res: Response, next: NextFunction) => {
    const originalJson = res.json.bind(res);

    res.json = function (body: any): Response {
        const snakeCaseData = convertObjectKeysToSnakeCase(body);
        return originalJson(snakeCaseData);
    };

    next();
};
