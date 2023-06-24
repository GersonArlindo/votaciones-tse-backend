
import { NextFunction, Request, Response } from "express";
import Users from "../models/users";
import jwt from "jsonwebtoken";

export const returnJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token: any = req.header("login-token");
    const secret: any = process.env.SECRET_KEY;
    /*     if (!token) {
            return res.status(400).json({
                msg: "Token is required"
            })
        } */

    try {
        const uid: any = jwt.verify(token, secret);
        const usuario: any = await Users.findByPk(uid.uid);

        if (!usuario) {
            return res.status(401).json({
                msg: "User does not exist"
            })
        }

        // retornamos en la request el id del usuario logueado
        req.body.uid = uid.uid;
        next();
    } catch (error) {
        return res.status(500).json({
            msg: "Check if your token is correct or if your user is active",
            error
        })
    }


}