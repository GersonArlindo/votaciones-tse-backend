import { Router } from 'express'
import { getProvider, getProviderById, createProvider, updateProvider, deleteProvider } from '../controllers/provider.controller';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

router.get('/show', [validarJWT], getProvider);

router.get('/show/:id', [validarJWT], getProviderById);

router.post('/add', [validarJWT], createProvider);

router.put('/update/:id', [validarJWT], updateProvider);

router.delete('/delete/:id', [validarJWT], deleteProvider);

export default router;