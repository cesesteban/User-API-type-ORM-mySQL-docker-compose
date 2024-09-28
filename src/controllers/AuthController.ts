import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthServices';

export class AuthController {
    private authService = new AuthService();

    async loginUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { email, password } = req.body;
            const token = await this.authService.loginUser(email, password);

            return res.json({ token });
        } catch (error) {
            next(error);
        }
    }

    async refreshToken(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { token, payload } = req.body;
            const newToken = await this.authService.refreshToken(token, payload.userId);

            return res.json({ token: newToken });
        } catch (error) {
            next(error);
        }
    }
}
