import { Router } from 'express'
import { getModules, getModulesById, createModules, updateModules, deleteModules, roleModule } from '../controllers/modules.controller';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

router.get('/show', [validarJWT], getModules);

router.get('/show/:id', [validarJWT], getModulesById);

router.post('/add', [validarJWT], createModules);

router.put('/update/:id', [validarJWT], updateModules);

router.delete('/delete/:id', [validarJWT], deleteModules);

router.get('/rol_id/:rol_id', [validarJWT], roleModule);


export default router;