import { AppDataSource } from '../configs/dataSource';
import * as crypto from 'crypto';
import bcrypt from 'bcryptjs';
import IRequestCreateUser from '../interfaces/user/IRequestCreateUser';
import { User } from '../entities/user/User';
import { UserRole } from '../entities/user/UserRole';
import { UserDTO } from '../dtos/user/UserDto';
import { KEY_EMAIL, KEY_ENCODING, KEY_PASSWORD, KEY_ROLES, ROLE_ADMIN, ROLES_ENTITY, SESSION_ENTITY, STATUS_CODE, STATUS_MESSAGE } from '../commons/statics';
import { nonNull } from '../commons/utils';
import { UsersDTO } from '../dtos/user/UsersDto';
import IRequestUpdateUser from '../interfaces/user/IRequestUpdateUser';
import IRequestPatchUser from '../interfaces/user/IRequestPatchUser';
import { ApiException } from '../handlers/ApiException';
import { EUserRole } from '../enums/EUserRole';

export class UserService {
    private userRepository = AppDataSource.getRepository(User);

    async createUser(userRequest: IRequestCreateUser, isAdmin: boolean): Promise<UserDTO> {
        const user = await this.buildUserEntity(userRequest, new User(), isAdmin);

        const newUserEntity: User = await this.userRepository.save(user);

        return new UserDTO(newUserEntity);
    }

    async getUserById(id: number): Promise<UserDTO | null> {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: [ROLES_ENTITY, SESSION_ENTITY]
        });

        if (!nonNull(user)) throw new ApiException(STATUS_MESSAGE.NOT_FOUND, STATUS_CODE.NOT_FOUND);

        return new UserDTO(user);
    }

    async getUserEntityById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { id }
        });

        if (!user) throw new ApiException(STATUS_MESSAGE.NOT_FOUND, STATUS_CODE.NOT_FOUND);

        return user;
    }

    async getAllUsers(): Promise<UsersDTO[]> {
        const usersEntity = await this.userRepository.find();
        const users = usersEntity.map((u) => new UsersDTO(u));
        return users;
    }

    async updateUser(id: number, data: IRequestPatchUser | IRequestUpdateUser, isAdmin: boolean): Promise<UserDTO | null> {
        let user = await this.getUserEntityById(id);
        user = await this.buildUserEntity(data, user, isAdmin);
        await this.userRepository.save(user);

        return await this.getUserById(id);
    }

    async deleteUser(id: number): Promise<number | null> {
        let user = await this.getUserEntityById(id);
        user.isActive = false;

        await this.userRepository.save(user);
        return STATUS_CODE.OK;
    }

    async changePassword(id: number, newPassword: string, oldPassword: string): Promise<void | number> {
        const user = await this.getUserEntityById(id);

        const isValid = await bcrypt.compare(oldPassword, user.passwordHash);
        if (!isValid) throw new ApiException(STATUS_MESSAGE.BAD_REQUEST, STATUS_CODE.BAD_REQUEST);

        const passwordHash = await bcrypt.hash(newPassword, 10);
        await this.userRepository.update(id, { passwordHash });
    }

    async resetPassword(id: number): Promise<void | string | number> {
        await this.getUserEntityById(id);

        const newPassword = crypto.randomBytes(6).toString(KEY_ENCODING);
        const passwordHash = await bcrypt.hash(newPassword, 10);
        await this.userRepository.update(id, { passwordHash });
        return newPassword;
    }

    async buildUserEntity(userRequest: IRequestPatchUser | IRequestUpdateUser | IRequestCreateUser, userEntity: User, isAdmin: boolean): Promise<User> {
        userEntity.username = userRequest.username != null ? userRequest.username : userEntity.username;
        userEntity.firstName = userRequest.firstName != null ? userRequest.firstName : userEntity.firstName;
        userEntity.lastName = userRequest.lastName != null ? userRequest.lastName : userEntity.lastName;

        if (this.isIRequestUpdateUser(userRequest) || this.isIRequestCreateUser(userRequest)) {
            userEntity.email = userRequest.email != null ? userRequest.email : userEntity.email;
            userEntity.countryIso = userRequest.countryIso != null ? userRequest.countryIso : userEntity.countryIso;
            userEntity.isActive = userRequest.isActive != null ? userRequest.isActive : userEntity.isActive;
            userEntity.roles = this.buildRolesEntity(userRequest, userEntity, isAdmin);
        }

        if (this.isIRequestCreateUser(userRequest)) {
            const passwordHash = await bcrypt.hash(userRequest.password, 10);
            userEntity.passwordHash = passwordHash;
        }

        return userEntity;
    }

    private buildRolesEntity(userRequest: IRequestCreateUser | IRequestUpdateUser, userEntity: User, isAdmin: boolean): UserRole[] {
        const existingRoles = userEntity.roles || [];

        if (userRequest.roles.includes(EUserRole.ADMIN) && !isAdmin) throw new ApiException(STATUS_MESSAGE.FORBIDDEN, STATUS_CODE.FORBIDDEN);

        const newRoles =
            userRequest.roles?.map((role) => {
                const userRole = existingRoles.find((r) => r.role === role);
                if (userRole) {
                    // Update existing role
                    userRole.isActive = true;
                    return userRole;
                } else {
                    // Create new role
                    const newUserRole = new UserRole();
                    newUserRole.role = role;
                    newUserRole.user = userEntity;
                    newUserRole.isActive = true;
                    return newUserRole;
                }
            }) || [];

        existingRoles.forEach((existingRole) => {
            if (!newRoles.some((newRole) => newRole.role === existingRole.role)) {
                existingRole.isActive = false;
            }
        });

        return newRoles;
    }

    private isIRequestUpdateUser(request: any): request is IRequestUpdateUser {
        return KEY_EMAIL in request && KEY_ROLES in request;
    }

    private isIRequestCreateUser(request: any): request is IRequestCreateUser {
        return KEY_PASSWORD in request;
    }
}
