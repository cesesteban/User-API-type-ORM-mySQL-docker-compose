import { IsBoolean, IsEnum, IsNumber, IsString, Length } from 'class-validator';
import { EUserRole } from '../../enums/EUserRole';

export default class IRequestCreateUser {
    @IsString({ message: 'Username must be a string' })
    @Length(1, 255, { message: 'Username must be between 1 and 255 characters' })
    username: string = '';

    @IsString({ message: 'First name must be a string' })
    @Length(1, 255, { message: 'First name must be between 1 and 255 characters' })
    firstName: string = '';

    @IsString({ message: 'Last name must be a string' })
    @Length(1, 255, { message: 'Last name must be between 1 and 255 characters' })
    lastName: string = '';

    @IsString({ message: 'Email must be a string' })
    @Length(1, 255, { message: 'Email must be between 1 and 255 characters' })
    email: string = '';

    @IsString({ message: 'Password must be a string' })
    @Length(1, 255, { message: 'Password must be between 1 and 255 characters' })
    password: string = '';

    @IsEnum(EUserRole, { each: true, message: 'Each role must be one of: ADMIN, USER, GUEST' })
    roles: EUserRole[] = [EUserRole.GUEST];

    @IsString({ message: 'country_iso must be a number' })
    @Length(1, 2, { message: 'country_iso must be have 2 characters' })
    countryIso: string = '';

    @IsBoolean({ message: 'isActive must be type boolean' })
    isActive: boolean;
}
