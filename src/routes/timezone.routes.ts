import { Router } from 'express'
import { createTimeZone, deleteTimeZone, getTimeZone, getTimeZoneById, updateTimeZone } from '../controllers/time_zone.controller';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

router.get('/show', [validarJWT], getTimeZone);

router.get('/show/:id', [validarJWT], getTimeZoneById);

router.post('/add', [validarJWT], createTimeZone);

router.put('/update/:id', [validarJWT], updateTimeZone);

router.delete('/delete/:id', [validarJWT], deleteTimeZone);

export default router;