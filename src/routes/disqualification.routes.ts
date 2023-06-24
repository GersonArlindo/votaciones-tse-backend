import { Router } from 'express'
import { createDisqualification, deleteDisqualification, getDisqualification, getDisqualificationById, updateDisqualification } from '../controllers/disqualification.controller';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

router.get('/show', [validarJWT], getDisqualification);

router.get('/show/:id', [validarJWT], getDisqualificationById);

router.post('/add', [validarJWT], createDisqualification);

router.put('/update/:id', [validarJWT], updateDisqualification);

router.delete('/delete/:id', [validarJWT], deleteDisqualification);

export default router;