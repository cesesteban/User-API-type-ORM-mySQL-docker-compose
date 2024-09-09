import { AppDataSource } from '../configs/dataSource';
import * as crypto from 'crypto';
import bcrypt from 'bcryptjs';
import IRequestCreateUser from '../models/user/IRequestCreateUser';
import { UserEntity } from '../entities/UserEntity';
import { UserRoleEntity } from '../entities/UserRoleEntity';
import { UserDTO } from '../dtos/user/UserDto';
import { KEY_EMAIL, KEY_ENCODING, KEY_PASSWORD, KEY_ROLES, ROLES_ENTITY, SESSION_ENTITY, STATUS_CODE } from '../commons/statics';
import { nonNull } from '../commons/utils';
import { UsersDTO } from '../dtos/user/UsersDto';
import IRequestUpdateUser from '../models/user/IRequestUpdateUser';
import IRequestPatchUser from '../models/user/IRequestPatchUser';

export class UserService {
    private userRepository = AppDataSource.getRepository(UserEntity);

    async createUser(userRequest: IRequestCreateUser): Promise<UserDTO> {
        const user = await this.buildUserEntity(userRequest, new UserEntity());
        const newUserEntity: UserEntity = await this.userRepository.save(user);
        return new UserDTO(newUserEntity);
    }

    async getUserById(id: number): Promise<UserDTO | null> {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: [ROLES_ENTITY, SESSION_ENTITY]
        });

        if (!nonNull(user)) return null;

        return new UserDTO(user);
    }

    async getUserEntityById(id: number): Promise<UserEntity | null> {
        return await this.userRepository.findOne({
            where: { id }
        });
    }

    async getAllUsers(): Promise<UsersDTO[]> {
        const usersEntity = await this.userRepository.find();
        const users = usersEntity.map((u) => new UsersDTO(u));
        return users;
    }

    async updateUser(id: number, data: IRequestPatchUser | IRequestUpdateUser): Promise<UserDTO | null> {
        let user = await this.getUserEntityById(id);
        if (!user) return null;

        user = await this.buildUserEntity(data, user);
        await this.userRepository.save(user);
        return await this.getUserById(id);
    }

    async deleteUser(id: number): Promise<number | null> {
        let user = await this.getUserEntityById(id);
        if (!user) return null;
        user.isActive = false;
        await this.userRepository.save(user);
        return STATUS_CODE.OK;
    }

    async changePassword(id: number, newPassword: string, oldPassword: string): Promise<void | number> {
        const user = await this.getUserEntityById(id);
        if (!user) return STATUS_CODE.NOT_FOUND;

        const isValid = await bcrypt.compare(oldPassword, user.passwordHash);
        if (!isValid) return STATUS_CODE.BAD_REQUEST;

        const passwordHash = await bcrypt.hash(newPassword, 10);
        await this.userRepository.update(id, { passwordHash });
    }

    async resetPassword(id: number): Promise<void | string | number> {
        const user = await this.getUserEntityById(id);
        if (!user) return STATUS_CODE.NOT_FOUND;

        const newPassword = crypto.randomBytes(6).toString(KEY_ENCODING);
        const passwordHash = await bcrypt.hash(newPassword, 10);
        await this.userRepository.update(id, { passwordHash });
        return newPassword;
    }

    async buildUserEntity(userRequest: IRequestPatchUser | IRequestUpdateUser | IRequestCreateUser, userEntity: UserEntity): Promise<UserEntity> {
        userEntity.username = userRequest.username != null ? userRequest.username : userEntity.username;
        userEntity.firstName = userRequest.firstName != null ? userRequest.firstName : userEntity.firstName;
        userEntity.lastName = userRequest.lastName != null ? userRequest.lastName : userEntity.lastName;

        if (this.isIRequestUpdateUser(userRequest) || this.isIRequestCreateUser(userRequest)) {
            userEntity.email = userRequest.email != null ? userRequest.email : userEntity.email;
            userEntity.countryIso = userRequest.countryIso != null ? userRequest.countryIso : userEntity.countryIso;
            userEntity.isActive = userRequest.isActive != null ? userRequest.isActive : userEntity.isActive;
            userEntity.roles = this.buildRolesEntity(userRequest, userEntity);
        }

        if (this.isIRequestCreateUser(userRequest)) {
            const passwordHash = await bcrypt.hash(userRequest.password, 10);
            userEntity.passwordHash = passwordHash;
        }

        return userEntity;
    }

    private buildRolesEntity(userRequest: IRequestCreateUser | IRequestUpdateUser, userEntity: UserEntity): UserRoleEntity[] {
        const existingRoles = userEntity.roles || [];

        const newRoles =
            userRequest.roles?.map((role) => {
                const userRole = existingRoles.find((r) => r.role === role);
                if (userRole) {
                    // Update existing role
                    userRole.isActive = true;
                    return userRole;
                } else {
                    // Create new role
                    const newUserRole = new UserRoleEntity();
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
