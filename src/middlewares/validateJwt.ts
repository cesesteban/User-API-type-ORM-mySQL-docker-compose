import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../configs/config';
import { NAMESPACE_API_SERVER, STATUS_CODE, STATUS_MESSAGE } from '../commons/statics';
import { ApiException } from '../handlers/ApiException';
import logging from '../configs/logging';

export const validateJwt = (req: Request, res: Response, next: NextFunction) => {
    const token: string = <string>req.headers[config.jwtSecret.headers as string];
    let jwtPayload: jwt.JwtPayload;

    try {
        jwtPayload = <jwt.JwtPayload>jwt.verify(token, config.jwtSecret.secret as string);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        logging.error(NAMESPACE_API_SERVER, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - ERROR: ["${error}]`);
        return res.status(STATUS_CODE.INTERNAL_ERROR).json({ message: STATUS_MESSAGE.INTERNAL_ERROR });
    }

    next();
};
