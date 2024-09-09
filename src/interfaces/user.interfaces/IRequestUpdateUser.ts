import { IsNumber, IsString, Length } from 'class-validator';

export default class IRequestUpdateUser {
    @IsString({ message: 'Username must be a string' })
    @Length(1, 255, { message: 'Username must be between 1 and 255 characters' })
    username: string = '';

    @IsString({ message: 'First name must be a string' })
    @Length(1, 255, { message: 'First name must be between 1 and 255 characters' })
    firstName: string = '';

    @IsString({ message: 'Last name must be a string' })
    @Length(1, 255, { message: 'Last name must be between 1 and 255 characters' })
    lastName: string = '';

    @IsString({ message: 'Emal must be a string' })
    @Length(1, 255, { message: 'Email must be between 1 and 255 characters' })
    email: string = '';

    @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 12 }, { message: 'role_id must be a number' })
    roleId: number = 0;

    @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 12 }, { message: 'country_id must be a number' })
    countryId: number = 0;
}
