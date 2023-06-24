import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const Validar_errores:any=(req:Request,res:Response,next:NextFunction)=>{
    const errores= validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json(errores)
    }
    next(); 
}


export{
    Validar_errores
}