import express, { Router, Request, Response, NextFunction } from 'express';
import v1Routes from './v1/index';
import { API_TS_SERVER } from '../commons/statics';

const router: Router = express.Router();

router.use('/api/v1', v1Routes);

router.use('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.status(200).json({ result: API_TS_SERVER });
});

export default router;
