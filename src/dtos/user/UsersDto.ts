import moment from 'moment';
import { User } from '../../entities/user/User';

export class UsersDTO {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;

    constructor(user: User) {
        this.id = user.id;
        this.username = user.username;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
    }
}
