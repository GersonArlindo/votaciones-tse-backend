import { Router } from 'express'
import { createRoof, deleteRoof, getRoof, getRoofById, updateRoof } from '../controllers/roof.controller';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

router.get('/show', [validarJWT], getRoof);

router.get('/show/:id', [validarJWT], getRoofById);

router.post('/add', [validarJWT], createRoof);

router.put('/update/:id', [validarJWT], updateRoof);

router.delete('/delete/:id', [validarJWT], deleteRoof);

export default router;