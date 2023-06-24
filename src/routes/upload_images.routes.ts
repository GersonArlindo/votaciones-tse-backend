import { Router } from 'express'
import { validarJWT } from '../middlewares/validarJWT';
import { getResources, uploadElements, deleteElements } from '../helpers/upload_image';

const router = Router();

router.get('/show', [validarJWT], getResources);

router.post('/add', [validarJWT], uploadElements);

router.delete('/delete', [validarJWT], deleteElements)


export default router;