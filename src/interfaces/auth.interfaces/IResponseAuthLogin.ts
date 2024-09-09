import IUser from '../user.interfaces/IUser';

export default interface IResponseAuthLogin {
    result: IUser | string;
    status: number;
}
