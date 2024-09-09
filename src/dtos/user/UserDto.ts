import moment from 'moment';
import { UserEntity } from '../../entities/UserEntity';
import { EUserRole } from '../../enums/EUserRole';
import { MOMENT_FORMAT } from '../../commons/statics';

export class UserDTO {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    countryIso: string;
    roles: EUserRole[];
    isActive: boolean;
    session: {
        sessionToken: string | null;
        createdAt: string | null;
        updatedAt: string | null;
        expiresAt: string | null;
    };
    createdAt: string;
    updatedAt: string;

    constructor(user: UserEntity) {
        this.id = user.id;
        this.username = user.username;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.countryIso = user.countryIso;
        this.roles = user.roles.map((role) => role.role);
        this.isActive = Boolean(user.isActive);
        this.session = {
            sessionToken: user.session?.sessionToken,
            createdAt: user.session?.sessionToken && moment(user.session?.createdAt).format(MOMENT_FORMAT),
            updatedAt: user.session?.sessionToken && moment(user.session?.updatedAt).format(MOMENT_FORMAT),
            expiresAt: user.session?.sessionToken && moment(user.session?.expiresAt).format(MOMENT_FORMAT)
        };
        this.createdAt = moment(user.createdAt).format(MOMENT_FORMAT);
        this.updatedAt = moment(user.updatedAt).format(MOMENT_FORMAT);
    }
}
