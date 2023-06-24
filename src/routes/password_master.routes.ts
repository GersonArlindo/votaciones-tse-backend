import { Router } from 'express'
import { createPasswordMaster, deletePasswordMaster, getPasswordMaster, getPasswordMasterById, updatePasswordMaster } from '../controllers/password_master.controller';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

router.get('/show', [validarJWT], getPasswordMaster);

router.get('/show/:id', [validarJWT], getPasswordMasterById);

router.post('/add', [validarJWT], createPasswordMaster);

router.put('/update/:id', [validarJWT], updatePasswordMaster);

router.delete('/delete/:id', [validarJWT], deletePasswordMaster);

export default router;