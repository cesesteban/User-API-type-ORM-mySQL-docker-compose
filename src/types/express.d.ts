import { UserEntity } from '../entities/user/User';

declare global {
    namespace Express {
        interface Request {
            user?: UserEntity;
        }
    }
}
