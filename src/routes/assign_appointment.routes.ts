import { Router } from 'express'
import { getAssignAppointment, getAssignAppointmentById, createAssignAppointment, updateAssignAppointment, deleteAssignAppointment } from '../controllers/assign_appointment.controller';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

router.get('/show', [validarJWT], getAssignAppointment);

router.get('/show/:id', [validarJWT], getAssignAppointmentById);

router.post('/add', [validarJWT], createAssignAppointment);

router.put('/update/:id', [validarJWT], updateAssignAppointment);

router.delete('/delete/:id',  [validarJWT], deleteAssignAppointment);

export default router;