import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../configs/config';
import { STATUS_CODE } from '../commons/statics';

export const validateJwt = (req: Request, res: Response, next: NextFunction) => {
    const token: string = <string>req.headers[config.jwtSecret.headers as string];
    let jwtPayload: jwt.JwtPayload;

    try {
        jwtPayload = <jwt.JwtPayload>jwt.verify(token, config.jwtSecret.secret as string);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        res.status(STATUS_CODE.UNAUTHORIZED).send();
        return;
    }

    next();
};
