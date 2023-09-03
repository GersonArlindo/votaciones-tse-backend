import { check } from "express-validator";
import { validarJWT } from "../middlewares/validarJWT";
import { Validar_errores } from "../middlewares/validarCampos";
import { Change_password, Login, LoginPersonaNatural } from "../controllers/auth.controller";
import { Router } from "express";

const router = Router();

router.post('/login',
    [
        check('email', 'Mail is required').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        Validar_errores
    ],
    Login);

router.post('/login/persona_natural',
[
    check('dui_persona', 'Dui is required').not().isEmpty(),
    Validar_errores
],
LoginPersonaNatural);


router.put('/update/password', 
    [
        validarJWT, 
        check("password", "Password is required").not().isEmpty(), 
        Validar_errores
    ], Change_password);


export default router;