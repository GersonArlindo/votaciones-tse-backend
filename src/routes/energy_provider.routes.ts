import { Router } from 'express'
import { createEnergyProvider, deleteEnergyProvider, getEnergyProvider, getEnergyProviderById, updateEnergyProvider } from '../controllers/energy_provider.controller';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

router.get('/show', [validarJWT], getEnergyProvider);

router.get('/show/:id', [validarJWT], getEnergyProviderById);

router.post('/add', [validarJWT], createEnergyProvider);

router.put('/update/:id', [validarJWT], updateEnergyProvider);

router.delete('/delete/:id', [validarJWT], deleteEnergyProvider);

export default router;