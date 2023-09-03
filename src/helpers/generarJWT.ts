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

export const generarJWTPersonNatural:any=(dui_persona:any, nombre_persona: any, apellidos_persona: any, genero: any, departamento: any, municipio: any, direccion_persona: any, fecha_nacimiento: any, )=>{
    const secret:any=process.env.SECRET_KEY_PERSONA_NATURAL;
    return new Promise((resolve,reject)=>{
        const payload={dui_persona, nombre_persona, apellidos_persona, genero, departamento, municipio, direccion_persona, fecha_nacimiento};
        jwt.sign(payload,secret,{
            expiresIn: '24h'
        },(err,token)=>{
            if (err) {
                reject('No se pudo generar el jwt');
            }else{
                resolve(token);
            }
        });
    })
}
