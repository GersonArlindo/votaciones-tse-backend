import { Router } from 'express'
import { createSalesRep, deleteSalesRep, getSalesRep, getSalesRepById, updateSalesRep } from '../controllers/sales_rep.controller';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

router.get('/show', [validarJWT], getSalesRep);

router.get('/show/:id', [validarJWT], getSalesRepById);

router.post('/add', [validarJWT], createSalesRep);

router.put('/update/:id', [validarJWT], updateSalesRep);

router.delete('/delete/:id', [validarJWT], deleteSalesRep);

export default router;