import { Router } from 'express'
import { getInstallers, getInstallersById, createInstallers, updateInstallers, deleteInstallers } from '../controllers/installers.controller';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

router.get('/show', [validarJWT], getInstallers);

router.get('/show/:id', [validarJWT], getInstallersById);

router.post('/add', [validarJWT], createInstallers);

router.put('/update/:id', [validarJWT], updateInstallers);

router.delete('/delete/:id', [validarJWT], deleteInstallers);

export default router;