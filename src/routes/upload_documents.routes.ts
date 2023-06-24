import { Router } from 'express'
import { validarJWT } from '../middlewares/validarJWT';
import { deleteElementsDoc, getResourcesDoc, uploadElementsDoc } from '../helpers/upload_documents';

const router = Router();

router.get('/show', [validarJWT], getResourcesDoc);

router.post('/add', [validarJWT], uploadElementsDoc);

router.delete('/delete', [validarJWT], deleteElementsDoc)


export default router;