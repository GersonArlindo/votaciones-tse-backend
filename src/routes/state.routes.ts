import { Router } from 'express'
import { getStates, getStatesById, createStates, updateStates, deleteStates } from '../controllers/states.controller';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

router.get('/show', [validarJWT], getStates);

router.get('/show/:id', [validarJWT], getStatesById);

router.post('/add', [validarJWT], createStates);

router.put('/update/:id', [validarJWT], updateStates);

router.delete('/delete/:id', [validarJWT], deleteStates);

export default router;