import { Router } from 'express'
import { getLead, getLeadById, createLead, updateLead, deleteLead, uploadLeadCSV, getLeadBySheet } from '../controllers/lead.controller';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

router.get('/show', [validarJWT], getLead);

router.get('/show/:id', [validarJWT], getLeadById);

router.get('/show/google/sheet', [validarJWT], getLeadBySheet);

router.post('/add', [validarJWT], createLead);

router.post('/details/:id', [validarJWT], getLeadById);

router.post('/upload', [validarJWT], uploadLeadCSV)

router.put('/update/:id', [validarJWT], updateLead);

router.delete('/delete/:id', [validarJWT], deleteLead);

export default router;