import { Router } from 'express'
import { getPermission, getPermissionById, createPermission, updatePermission, deletePermission, changePermission, getPermissionByRole } from '../controllers/permission.controller';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

router.get('/show', [validarJWT], getPermission);

router.get('/show/:id', [validarJWT], getPermissionById);

router.post('/add', [validarJWT], createPermission);

router.put('/update/:id', [validarJWT], updatePermission);

router.delete('/delete/:id', [validarJWT], deletePermission);

router.get('/change/:status', [validarJWT], changePermission);

router.get('/show/role/:rol_id', [validarJWT], getPermissionByRole);

export default router;