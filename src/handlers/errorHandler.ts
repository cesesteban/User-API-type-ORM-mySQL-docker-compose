import { Request, Response, NextFunction } from 'express';
import { ApiException } from './ApiException';
import { NAMESPACE_API_SERVER, STATUS_CODE, STATUS_MESSAGE } from '../commons/statics';
import logging from '../configs/logging';
import { nonNull } from '../commons/utils';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (nonNull(err.status)) {
        return res.status(err.status).json({ message: err.message });
    } else {
        // Manejo de errores no esperados
        logging.error(NAMESPACE_API_SERVER, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - ERROR: ["${err}]`);
        return res.status(STATUS_CODE.INTERNAL_ERROR).json({ message: err.message });
    }
};

export default errorHandler;
