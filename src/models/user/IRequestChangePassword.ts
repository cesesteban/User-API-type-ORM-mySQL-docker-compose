import { IsString, Length } from 'class-validator';

export default class IRequestCreateUser {
    @IsString({ message: 'Password must be a string' })
    @Length(1, 255, { message: 'Password must be between 1 and 255 characters' })
    newPassword: string = '';

    @IsString({ message: 'Password must be a string' })
    @Length(1, 255, { message: 'Password must be between 1 and 255 characters' })
    oldPassword: string = '';
}
