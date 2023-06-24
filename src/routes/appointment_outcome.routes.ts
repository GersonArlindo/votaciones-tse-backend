import { Router } from 'express'
import { createAppointmentOutcome, deleteAppointmentOutcome, getAppointmentOutcome, getAppointmentOutcomeById, updateAppointmentOutcome } from '../controllers/appointment_outcome.controller';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

router.get('/show', [validarJWT], getAppointmentOutcome);

router.get('/show/:id', [validarJWT], getAppointmentOutcomeById);

router.post('/add', [validarJWT], createAppointmentOutcome);

router.put('/update/:id', [validarJWT], updateAppointmentOutcome);

router.delete('/delete/:id', [validarJWT], deleteAppointmentOutcome);

export default router;