import { Router } from 'express'
import { createLanguage, deleteLanguage, getLanguage, getLanguageById, updateLanguage } from '../controllers/lenguage.controller';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

router.get('/show', [validarJWT], getLanguage);

router.get('/show/:id', [validarJWT], getLanguageById);

router.post('/add', [validarJWT], createLanguage);

router.put('/update/:id', [validarJWT], updateLanguage);

router.delete('/delete/:id', [validarJWT], deleteLanguage);

export default router;