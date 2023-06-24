import { Router } from 'express'
import { validarJWT } from '../middlewares/validarJWT';
import { getResourcesAudio, uploadElementsAudio, deleteElementsAudio } from '../helpers/upload_audio';

const router = Router();

router.get('/show', [validarJWT], getResourcesAudio);

router.post('/add', [validarJWT], uploadElementsAudio);

router.delete('/delete', [validarJWT], deleteElementsAudio)


export default router;