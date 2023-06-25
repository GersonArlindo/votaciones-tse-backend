import { Router } from 'express'
import { getPartidosPoliticos, getPartidosPoliticosById, createPartidosPoliticos, updatePartidosPoliticos, deletePartidosPoliticos } from '../controllers/partidos_politicos.controller';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

router.get('/show', [validarJWT], getPartidosPoliticos);

router.get('/show/:id', [validarJWT], getPartidosPoliticosById);

router.post('/add', createPartidosPoliticos);

router.put('/update/:id', [validarJWT], updatePartidosPoliticos);

router.delete('/delete/:id', [validarJWT], deletePartidosPoliticos);

export default router;