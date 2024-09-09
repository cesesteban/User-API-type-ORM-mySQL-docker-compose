import { Request, Response, NextFunction } from 'express';
import { ROLES_ENTITY, STATUS_CODE, STATUS_MESSAGE, UNAUTHORIZED_MESSAGE } from '../commons/statics';
import { AppDataSource } from '../configs/dataSource';
import { UserEntity } from '../entities/UserEntity';
import { isNull, nonNull } from '../commons/utils';
import { EUserRole } from '../enums/EUserRole';
import { UserRoleEntity } from '../entities/UserRoleEntity';

export const validateRole = (roles: Array<EUserRole>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const userRepository = AppDataSource.getRepository(UserEntity);
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
        const hasValidRole = user.roles.some((userRole: UserRoleEntity) => {
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
            return res.status(STATUS_CODE.UNAUTHORIZED).send(STATUS_MESSAGE.UNAUTHORIZED);
        }
    };
};
