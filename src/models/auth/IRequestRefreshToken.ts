import { IsNumber, IsString, Length } from 'class-validator';

export default class IRequestRefreshToken {
    @IsString({ message: 'token must be a string' })
    @Length(1, 255, { message: 'token must be between 1 and 255 characters' })
    token: string = '';
}
