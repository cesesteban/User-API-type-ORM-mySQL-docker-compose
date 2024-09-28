import { Router } from 'express';
import { UserController } from '../../controllers/UserController';
import { validateRequest } from '../../middlewares/validateRequest';
import IRequestCreateUser from '../../interfaces/user/IRequestCreateUser';
import { EUserRole } from '../../enums/EUserRole';
import { validateRole } from '../../middlewares/validateRole';
import { validateJwt } from '../../middlewares/validateJwt';
import IRequestUpdateUser from '../../interfaces/user/IRequestPatchUser';
import IRequestChangePassword from '../../interfaces/auth/IRequestChangePassword';
import IRequestPatchUser from '../../interfaces/user/IRequestPatchUser';
import { validateIsAdmin } from '../../middlewares/validateIsAdmin';

const router = Router();
const userController = new UserController();

router.post('/', [validateRequest(IRequestCreateUser), validateIsAdmin], userController.createUser.bind(userController));
router.get('/:id', [validateJwt, validateRole([EUserRole.ADMIN, EUserRole.USER])], userController.getUserById.bind(userController));
router.get('/', [validateJwt, validateRole([EUserRole.ADMIN])], userController.getAllUsers.bind(userController));
router.patch('/:id', validateRequest(IRequestPatchUser), [validateJwt, validateRole([EUserRole.USER])], userController.updateUser.bind(userController));
router.put('/:id', validateRequest(IRequestUpdateUser), [validateJwt, validateRole([EUserRole.ADMIN]), validateIsAdmin], userController.updateUser.bind(userController));
router.put('/change-password/:id', validateRequest(IRequestChangePassword), [validateJwt, validateRole([EUserRole.USER])], userController.changePassword.bind(userController));
router.post('/reset-password/:id', [validateJwt, validateRole([EUserRole.ADMIN])], userController.resetPassword.bind(userController));
router.delete('/:id', [validateJwt, validateRole([EUserRole.ADMIN, EUserRole.USER])], userController.deleteUser.bind(userController));

export default router;
