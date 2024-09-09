import express, { Router, Request, Response, NextFunction } from 'express';
import userRoutes from './userRoutes';
import authRoutes from './authRoutes';

const router: Router = express.Router();

router.use('/user', userRoutes);
router.use('/auth', authRoutes);

export default router;
