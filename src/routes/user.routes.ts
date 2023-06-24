import { Router } from 'express'
import { getUser, getUserById, createUser, updateUser, deleteUser } from '../controllers/user.controller';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

router.get('/show', [validarJWT], getUser);

router.get('/show/:id', [validarJWT], getUserById);

router.post('/add', createUser);

router.put('/update/:id', [validarJWT], updateUser);

router.delete('/delete/:id', [validarJWT], deleteUser);

export default router;