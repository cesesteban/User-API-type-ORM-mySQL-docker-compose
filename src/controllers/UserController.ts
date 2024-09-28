import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserServices';
import IRequestCreateUser from '../interfaces/user/IRequestCreateUser';
import { STATUS_CODE, STATUS_MESSAGE } from '../commons/statics';
import IRequestUpdateUser from '../interfaces/user/IRequestUpdateUser';
import IRequestPatchUser from '../interfaces/user/IRequestPatchUser';

export class UserController {
    private userService = new UserService();

    async createUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const userRequest: IRequestCreateUser = req.body;
            const isAdmin: boolean = req.body.isAdmin;

            const user = await this.userService.createUser(userRequest, isAdmin);
            return res.status(STATUS_CODE.OK).json({ result: user });
        } catch (error) {
            next(error);
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = req.params;
            const user = await this.userService.getUserById(Number(id));
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const users = await this.userService.getAllUsers();
            return res.json(users);
        } catch (error) {
            next(error);
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = req.params;
            const userRequest: IRequestPatchUser | IRequestUpdateUser = req.body;
            const isAdmin: boolean = req.body.isAdmin;
            const user = await this.userService.updateUser(Number(id), userRequest, isAdmin);
            return res.status(STATUS_CODE.OK).json({ result: user });
        } catch (error) {
            next(error);
        }
    }

    async changePassword(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = req.params;
            const { newPassword, oldPassword } = req.body;

            await this.userService.changePassword(Number(id), newPassword, oldPassword);

            return res.status(STATUS_CODE.OK).send(STATUS_MESSAGE.OK);
        } catch (error) {
            next(error);
        }
    }

    async resetPassword(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = req.params;

            const result = await this.userService.resetPassword(Number(id));

            return res.status(STATUS_CODE.OK).send({ newPassword: result });
        } catch (error) {
            next(error);
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = req.params;
            await this.userService.deleteUser(Number(id));
            return res.status(STATUS_CODE.OK).send(STATUS_MESSAGE.OK);
        } catch (error) {
            next(error);
        }
    }
}
