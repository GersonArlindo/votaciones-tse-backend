import { Router } from 'express'
import { createPersonasNaturales, deletePersonasNaturales, getPersonasNaturales, getPersonasNaturalById, updatePersonasNaturales } from '../controllers/personas_naturales.controller';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

router.get('/show', [validarJWT], getPersonasNaturales);

router.get('/show/:id', [validarJWT], getPersonasNaturalById);

router.post('/add', [validarJWT], createPersonasNaturales);

router.put('/update/:id', [validarJWT], updatePersonasNaturales);

router.delete('/delete/:id', [validarJWT], deletePersonasNaturales);

export default router;