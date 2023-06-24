import { Router } from 'express'
import { getRole, getRoleById, createRole, updateRole, deleteRole } from '../controllers/role.controller';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

router.get('/show', [validarJWT], getRole);

router.get('/show/:id', [validarJWT], getRoleById);

router.post('/add', [validarJWT], createRole);

router.put('/update/:id', [validarJWT], updateRole);

router.delete('/delete/:id', [validarJWT], deleteRole);

export default router;