import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import helmet from 'helmet';
import cors from 'cors';
import { DATA_SOURCE_INIZIALIZED, DATA_SOURCE_INIZIALIZED_ERR, NAMESPACE_API_SERVER } from './commons/statics';
import logging from './configs/logging';
import { AppDataSource } from './configs/dataSource';
import { snakeCaseStrategy } from './middlewares/snakeCaseStrategy';

const router = (): Express => {
    const router: Express = express();

    /** Log the request */
    router.use((req: Request, res: Response, next: NextFunction) => {
        /** Log the req */
        logging.info(NAMESPACE_API_SERVER, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            /** Log the res */
            logging.info(NAMESPACE_API_SERVER, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
        });

        next();
    });

    /** Parse the body of the request */
    router.use(bodyParser.urlencoded({ extended: true }));
    router.use(bodyParser.json());

    /** Rules of our API */
    router.use(cors());
    router.use(helmet());
    router.use(snakeCaseStrategy);

    AppDataSource.initialize()
        .then(() => {
            console.log(DATA_SOURCE_INIZIALIZED);
        })
        .catch((err) => {
            console.error(DATA_SOURCE_INIZIALIZED_ERR, err);
        });

    /** Route here */
    router.use('/', routes);

    return router;
};

export default router;
