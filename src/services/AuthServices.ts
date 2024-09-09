import { AppDataSource } from '../configs/dataSource';
import config from '../configs/config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../entities/user/User';
import { UserSession } from '../entities/user/UserSession';
import { SESSION_ENTITY } from '../commons/statics';

export class AuthService {
    private userRepository = AppDataSource.getRepository(User);
    private userSessionRepository = AppDataSource.getRepository(UserSession);

    EXPIRES_IN = Number(config.jwtSecret.expires) || 3600;

    async loginUser(email: string, password: string): Promise<string | null> {
        const user = await this.getUserWithSessionByEmail(email);

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) return null;

        const token = jwt.sign({ userId: user.id }, config.jwtSecret.secret as string, {
            expiresIn: this.EXPIRES_IN
        });

        if (user.session) {
            this.updateSession(user, token, this.EXPIRES_IN);
        } else {
            this.createSession(user, token, this.EXPIRES_IN);
        }

        return token;
    }

    async refreshToken(token: string, id: number): Promise<string | null> {
        const user = await this.getUserWithSessionById(id);

        if (user?.session.sessionToken == token) {
            const newToken = jwt.sign({ userId: id }, config.jwtSecret.secret as string, {
                expiresIn: this.EXPIRES_IN
            });

            this.updateSession(user, newToken, this.EXPIRES_IN);
            return newToken;
        }

        return null;
    }

    async createSession(user: User, token: string, expiresIn: number): Promise<void> {
        const session = new UserSession();
        session.user = user;
        session.sessionToken = token;
        session.expiresAt = new Date(Date.now() + expiresIn * 1000);

        await this.userSessionRepository.save(session);
    }

    async updateSession(user: User, token: string, expiresIn: number): Promise<void> {
        const now = new Date();
        user.session.sessionToken = token;
        user.session.updatedAt = new Date(now.getTime());
        user.session.expiresAt = new Date(now.getTime() + expiresIn * 1000);
        await this.userRepository.save(user);
    }

    async getUserWithSessionById(id: number): Promise<User | null> {
        return await this.userRepository.findOne({
            where: { id },
            relations: [SESSION_ENTITY]
        });
    }

    async getUserWithSessionByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOne({
            where: { email },
            relations: [SESSION_ENTITY]
        });
    }
}
