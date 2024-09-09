import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserServices';
import IRequestCreateUser from '../models/user/IRequestCreateUser';
import { STATUS_CODE, STATUS_MESSAGE } from '../commons/statics';
import IRequestUpdateUser from '../models/user/IRequestUpdateUser';
import IRequestPatchUser from '../models/user/IRequestPatchUser';

export class UserController {
    private userService = new UserService();

    async createUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const userRequest: IRequestCreateUser = req.body;
            const user = await this.userService.createUser(userRequest);
            return res.status(STATUS_CODE.OK).json({ result: user });
        } catch (error) {
            return res.status(STATUS_CODE.INTERNAL_ERROR).json({ error: error.message });
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { id } = req.params;
            const user = await this.userService.getUserById(Number(id));

            if (!user) {
                return res.status(STATUS_CODE.NOT_FOUND).json({ message: STATUS_MESSAGE.NOT_FOUND });
            }

            return res.json(user);
        } catch (error) {
            return res.status(STATUS_CODE.INTERNAL_ERROR).json({ error: error.message });
        }
    }

    async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const users = await this.userService.getAllUsers();
            return res.json(users);
        } catch (error) {
            return res.status(STATUS_CODE.INTERNAL_ERROR).json({ error: error.message });
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { id } = req.params;
            const userRequest: IRequestPatchUser | IRequestUpdateUser = req.body;
            const user = await this.userService.updateUser(Number(id), userRequest);

            if (!user) {
                return res.status(STATUS_CODE.NOT_FOUND).json({ message: STATUS_MESSAGE.NOT_FOUND });
            }

            return res.status(STATUS_CODE.OK).json({ result: user });
        } catch (error) {
            return res.status(STATUS_CODE.INTERNAL_ERROR).json({ error: error.message });
        }
    }

    async changePassword(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { id } = req.params;
            const { newPassword, oldPassword } = req.body;

            const result = await this.userService.changePassword(Number(id), newPassword, oldPassword);

            if (result == STATUS_CODE.NOT_FOUND) {
                return res.status(STATUS_CODE.NOT_FOUND).json({ message: STATUS_MESSAGE.NOT_FOUND });
            }

            if (result == STATUS_CODE.BAD_REQUEST) {
                return res.status(STATUS_CODE.BAD_REQUEST).json({ message: STATUS_MESSAGE.BAD_REQUEST });
            }

            return res.status(STATUS_CODE.OK).send(STATUS_MESSAGE.OK);
        } catch (error) {
            return res.status(STATUS_CODE.INTERNAL_ERROR).json({ error: error.message });
        }
    }

    async resetPassword(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { id } = req.params;

            const result = await this.userService.resetPassword(Number(id));

            if (result == STATUS_CODE.NOT_FOUND) {
                return res.status(STATUS_CODE.NOT_FOUND).json({ message: STATUS_MESSAGE.NOT_FOUND });
            }

            return res.status(STATUS_CODE.OK).send({ newPassword: result });
        } catch (error) {
            return res.status(STATUS_CODE.INTERNAL_ERROR).json({ error: error.message });
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { id } = req.params;

            const user = await this.userService.deleteUser(Number(id));

            if (!user) {
                return res.status(STATUS_CODE.NOT_FOUND).json({ message: STATUS_MESSAGE.NOT_FOUND });
            }

            return res.status(STATUS_CODE.OK).send(STATUS_MESSAGE.OK);
        } catch (error) {
            return res.status(STATUS_CODE.INTERNAL_ERROR).json({ error: error.message });
        }
    }
}
