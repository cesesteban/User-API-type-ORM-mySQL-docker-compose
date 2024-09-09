import { IsString, Length } from 'class-validator';

export default class IRequestAuthLogin {
    @IsString({ message: 'username must be a string' })
    @Length(1, 255, { message: 'username must be between 1 and 255 characters' })
    username: string = '';

    @IsString({ message: 'password must be a string' })
    @Length(1, 255, { message: 'password must be between 1 and 255 characters' })
    password: string = '';
}
