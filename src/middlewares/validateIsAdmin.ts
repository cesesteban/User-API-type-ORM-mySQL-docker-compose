import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../configs/config';
import { ROLE_ADMIN, ROLES_ENTITY, STATUS_CODE } from '../commons/statics';
import { AppDataSource } from '../configs/dataSource';
import { User } from '../entities/user/User';
import { nonNull } from '../commons/utils';
import { UserRole } from '../entities/user/UserRole';

export const validateIsAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const token: string = <string>req.headers[config.jwtSecret.headers as string];
    let isAdmin = false;
    req.body.isAdmin = isAdmin;

    if (token) {
        const userRepository = AppDataSource.getRepository(User);
        let jwtPayload;
        try {
            jwtPayload = await (<jwt.JwtPayload>jwt.verify(token, config.jwtSecret.secret as string));
        } catch (error) {}

        let userId;
        if (jwtPayload) userId = <number>jwtPayload.userId;
        //Get user role from the database
        const user = await userRepository.findOne({
            where: { id: userId },
            relations: [ROLES_ENTITY]
        });

        if (!nonNull(user)) {
            return res.status(STATUS_CODE.NOT_FOUND).send();
        }

        user.roles = user.roles.filter((role) => role.isActive);
        //Check if array of authorized roles includes the user's role
        isAdmin = user.roles.some((userRole: UserRole) => {
            return ROLE_ADMIN.includes(userRole.role);
        });
    }
    req.body.isAdmin = isAdmin;
    next();
};
