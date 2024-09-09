import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import crypto from 'crypto';
import config from '../configs/config';
import { STATUS_CODE } from '../commons/statics';

export function validateJwtSignature(req: Request, res: Response, next: NextFunction) {
    const token: string = <string>req.headers[config.jwtSecret.header as string];
    const decoded = jwt.decode(token, { complete: true });

    const [header, payload, signature] = token.split('.');
    const secretKey = config.jwtSecret.secret as string;
    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(`${header}.${payload}`);
    const generatedSignature = hmac.digest('base64url');

    req.body.payload = decoded?.payload;
    req.body.token = token;

    if (generatedSignature === signature) {
        next();
    } else {
        res.status(STATUS_CODE.UNAUTHORIZED).send();
    }
}
