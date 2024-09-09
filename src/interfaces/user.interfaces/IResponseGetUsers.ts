import IUser from './IUser';

export default interface IResponseGetUsers {
    result: Array<IUser> | string;
    status: number;
}
