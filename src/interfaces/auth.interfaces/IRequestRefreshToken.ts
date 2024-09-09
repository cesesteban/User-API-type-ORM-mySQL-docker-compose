import { IsNumber, IsString, Length } from 'class-validator';

export default class IRequestRefreshToken {
    @IsString({ message: 'auth must be a string' })
    @Length(1, 255, { message: 'auth must be between 1 and 255 characters' })
    userId: string = '';

    @IsString({ message: 'auth must be a string' })
    @Length(1, 255, { message: 'auth must be between 1 and 255 characters' })
    auth: string = '';
}
