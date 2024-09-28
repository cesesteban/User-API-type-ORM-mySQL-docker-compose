import express, { Router } from 'express';
import { AuthController } from '../../controllers/AuthController';
import { validateRequest } from '../../middlewares/validateRequest';
import IRequestAuth from '../../interfaces/auth/IRequestAuth';
import { validateHeaders } from '../../middlewares/validateHeaders';
import IRequestRefreshToken from '../../interfaces/auth/IRequestRefreshToken';
import { validateJwtSignature } from '../../middlewares/validateJwtSignature';

const router: Router = express.Router();

const authController = new AuthController();

router.post('/', validateRequest(IRequestAuth), authController.loginUser.bind(authController));
router.post('/refresh', [validateHeaders(IRequestRefreshToken), validateJwtSignature], authController.refreshToken.bind(authController));

export default router;
