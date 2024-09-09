import moment from 'moment';
import { UserEntity } from '../../entities/UserEntity';

export class UsersDTO {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;

    constructor(user: UserEntity) {
        this.id = user.id;
        this.username = user.username;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
    }
}
