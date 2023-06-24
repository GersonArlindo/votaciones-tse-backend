import jwt from "jsonwebtoken";

export const generarJWT:any=(uid:Number, name: any, rol_id: any)=>{
    const secret:any=process.env.SECRET_KEY;
    return new Promise((resolve,reject)=>{
        const payload={uid, name, rol_id};
        jwt.sign(payload,secret,{
            expiresIn: '12h'
        },(err,token)=>{
            if (err) {
                reject('No se pudo generar el jwt');
            }else{
                resolve(token);
            }
        });
    })
}
