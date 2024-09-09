import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthServices';
import { STATUS_CODE, STATUS_MESSAGE, UNAUTHORIZED_MESSAGE } from '../commons/statics';

export class AuthController {
    private authService = new AuthService();

    async loginUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { email, password } = req.body;
            const token = await this.authService.loginUser(email, password);

            if (!token) {
                return res.status(STATUS_CODE.UNAUTHORIZED).json({ message: STATUS_MESSAGE.UNAUTHORIZED });
            }

            return res.json({ token });
        } catch (error) {
            return res.status(STATUS_CODE.INTERNAL_ERROR).json({ error: error.message });
        }
    }

    async refreshToken(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { token, payload } = req.body;
            const newToken = await this.authService.refreshToken(token, payload.userId);

            if (!newToken) {
                return res.status(STATUS_CODE.UNAUTHORIZED).json({ message: STATUS_MESSAGE.UNAUTHORIZED });
            }

            return res.json({ token: newToken });
        } catch (error) {
            return res.status(STATUS_CODE.INTERNAL_ERROR).json({ error: error.message });
        }
    }
}
