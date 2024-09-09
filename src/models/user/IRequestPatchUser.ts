import { IsString, Length } from 'class-validator';

export default class IRequestPatchUser {
    @IsString({ message: 'Username must be a string' })
    @Length(1, 255, { message: 'Username must be between 1 and 255 characters' })
    username: string = '';

    @IsString({ message: 'First name must be a string' })
    @Length(1, 255, { message: 'First name must be between 1 and 255 characters' })
    firstName: string = '';

    @IsString({ message: 'Last name must be a string' })
    @Length(1, 255, { message: 'Last name must be between 1 and 255 characters' })
    lastName: string = '';
}
