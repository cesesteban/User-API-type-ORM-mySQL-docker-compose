import { IsString, Length } from 'class-validator';

export default class IRequestAuth {
    @IsString({ message: 'email must be a string' })
    @Length(1, 255, { message: 'email must be between 1 and 255 characters' })
    email: string = '';

    @IsString({ message: 'password must be a string' })
    @Length(1, 255, { message: 'password must be between 1 and 255 characters' })
    password: string = '';
}
