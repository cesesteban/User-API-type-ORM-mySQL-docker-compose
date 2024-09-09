import { IsString, Length } from 'class-validator';

export default class IRequestChangePassword {
    @IsString({ message: 'oldPassword must be a string' })
    @Length(1, 255, { message: 'oldPassword must be between 1 and 255 characters' })
    oldPassword: string = '';

    @IsString({ message: 'newPassword must be a string' })
    @Length(1, 255, { message: 'newPassword must be between 1 and 255 characters' })
    newPassword: string = '';
}
