import { Request, Response, NextFunction } from 'express';
import { ROLES_ENTITY, STATUS_CODE, STATUS_MESSAGE } from '../commons/statics';
import { AppDataSource } from '../configs/dataSource';
import { User } from '../entities/user/User';
import { isNull, nonNull } from '../commons/utils';
import { EUserRole } from '../enums/EUserRole';
import { UserRole } from '../entities/user/UserRole';

export const validateRole = (roles: Array<EUserRole>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const userRepository = AppDataSource.getRepository(User);
        //Get the user ID from previous midleware
        const userId: number = <number>res.locals.jwtPayload.userId;

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
        const hasValidRole = user.roles.some((userRole: UserRole) => {
            if (userRole.role === EUserRole.USER) {
                const { id } = req.params;
                if (isNull(id)) return false;
                return user.id == Number(id);
            } else {
                return roles.includes(userRole.role);
            }
        });

        if (hasValidRole) {
            next();
        } else {
            return res.status(STATUS_CODE.FORBIDDEN).json({ message: STATUS_MESSAGE.FORBIDDEN });
        }
    };
};
