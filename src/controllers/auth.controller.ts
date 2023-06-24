import { Request, Response } from "express";
import Users from "../models/users";
import bcryp from "bcryptjs";
import { generarJWT } from "../helpers/generarJWT";
require('dotenv').config;

const salt = bcryp.genSaltSync();

export const Login = async (req: Request, res: Response) => {

    // res.render('login/index');
    const { email, password } = req.body;
    try {

        // verificamos si existe el usuarios+
        const usuario: any = await Users.findOne({ where: { email: email } });
        const validpassword = bcryp.compareSync(password, usuario.password);
        const FullName: any = `${usuario.first_name} ${usuario.last_name}`;
        const token = await generarJWT(usuario.user_id, FullName, usuario.rol_id);

        if (!usuario) {
            res.status(400).json({
                msg: "Email incorrecto"
            })
        }
        else if (!validpassword) {
            res.status(400).json({
                msg: "Password incorrecto"
            })
        }
        else {

            res.status(200).json({
                token
            })
        }


    } catch (error) {
        return res.status(500).json({
            msg: "Something went wrong: Wrong username or password"
        });
    }


}//message

export const Change_password = async (req: Request, res: Response) => {

    // res.render('login/index');
    const id_user: any = req.body.uid;
    const { password } = req.body;
    const Newpassword = bcryp.hashSync(password, salt);
    const data = {
        password: Newpassword,
        status: true
    }
    try {

        // verificamos si existe el usuarios
        const user: any = await Users.findByPk(id_user);

        // verificamos los datos
        if (!user) {
            return res.status(400).json({
                msg: "User doesn't exist"
            });
        }
        else if (password.length < 6) {
            return res.status(400).json({
                msg: "The password need 7 characters minimum"
            });
        }

        else {
            await user.update(data);
            return res.status(200).json({
                msg: "User updated"
            });

        }

    } catch (error) {
        return res.status(500).json({
            msg: "Something went wrong: " + error
        });
    }

}