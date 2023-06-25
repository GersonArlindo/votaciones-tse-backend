import { Request, Response } from 'express'
import PersonasNaturales from './../models/personas_naturales'
import path from 'path';
import bcryp from 'bcryptjs';
const fs = require('fs').promises;
import util from "util";

const unlinkFile = util.promisify(fs.unlink);




export const getPersonasNaturales = async (req: Request, res: Response) => {
    try {
        const persona = await PersonasNaturales.findAll({ order: [['id_persona', 'DESC'],] });
        res.json({
            persona
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}


export const getPersonasNaturalById = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const persona = await PersonasNaturales.findOne({ where: { id_persona: id } })
        if (!persona) {
            return res.status(400).json({
                msg: "Persona Natural no encontrada"
            })
        }else{
            return res.json({
                persona
            })
        }
    } catch (error) {
        res.json({
            Msg: "Error: " + error
        })
    }
}

export const createPersonasNaturales = async (req: Request, res: Response) => {
    try {
        const { dui_persona, nombre_persona,apellidos_persona,genero,departamento, municipio, direccion_persona,fecha_nacimiento } = req.body;
        var datas;
        if(!req.files){
            datas = { dui_persona,persona_image: `muestra.png`, nombre_persona,apellidos_persona,genero,departamento, municipio, direccion_persona,fecha_nacimiento}
            
            let persona = await PersonasNaturales.create(datas);
            const id_persona  = persona.previous('id_persona')
            res.json({
                msg: "Creado",
                "id": id_persona 
            })
        }else{
            const { imagen }: any = req.files;
            
            const filePath = path.join(__dirname, './../../public/images', `${imagen.name}`)
            const extencion = imagen.name.split('.').pop();
            const nameUnic = uuidv4() + "." + extencion;

            if (extencion == "pdf") {
                return res.status(400).json({ msg: "Por favor, suba una imagen válida!" });
            }if (extencion == "doc") {
                return res.status(400).json({ msg: "Por favor, suba una imagen válida!" });
            }if (extencion == "xlsx") {
                return res.status(400).json({ msg: "Por favor, suba una imagen válida!" });
            }if (extencion == "jfif"){
                return res.status(400).json({ msg: "Por favor, suba una imagen válida!" });
            }

            const publicImg = `${imagen.name}`;

            imagen.mv(filePath, async (err: any) => {
                if (err) {
                    return res.status(500).send(err)
                }else{
                    datas = { dui_persona, nombre_persona,apellidos_persona,genero,departamento, municipio, direccion_persona,fecha_nacimiento, persona_image: publicImg }

                    // inserta los datos en la base
                    const persona = await PersonasNaturales.create(datas);
                    const id_persona = persona.previous('id_persona')

                    res.json({
                        msg: "Created",
                        "id": id_persona
                    });                 
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}
        
export const updatePersonasNaturales = async (req: Request, res: Response) => {
    try {
        const id: any = req.params.id;
        const { dui_persona, nombre_persona,apellidos_persona,genero,departamento, municipio, direccion_persona,fecha_nacimiento } = req.body;
        var datas;
        if(!req.files){
            datas = {dui_persona, nombre_persona,apellidos_persona,genero,departamento, municipio, direccion_persona,fecha_nacimiento}

            const persona: any = await PersonasNaturales.findByPk(id)
            persona.update(datas)
            res.json({
                msg: "Persona Natural Actualizada"
            })
        }else{
            const { imagen }: any = req.files;

            const filePath = path.join(__dirname, './../../public/images', `${imagen.name}`)
                const extencion = imagen.name.split('.').pop();
                const nameUnic = uuidv4() + "." + extencion;

                if (extencion == "pdf") {
                    return res.status(400).json({ msg: "Por favor, suba una imagen válida!" });
                }if (extencion == "doc") {
                    return res.status(400).json({ msg: "Por favor, suba una imagen válida!" });
                }if (extencion == "xlsx") {
                    return res.status(400).json({ msg: "Por favor, suba una imagen válida!" });
                }if (extencion == "jfif"){
                    return res.status(400).json({ msg: "Por favor, suba una imagen válida!" });
                }
                const publicImg = `${imagen.name}`;

                imagen.mv(filePath, async (err: any) => {
                    if (err) {
                        return res.status(500).send(err)
                    }else{
                        datas = {  dui_persona, nombre_persona,apellidos_persona,genero,departamento, municipio, direccion_persona,fecha_nacimiento, persona_image: publicImg  }

                        // inserta los datos en la base
                        const persona: any = await PersonasNaturales.findByPk(id)

                        persona.update(datas)

                        res.json({
                            msg: "Persona Natural Actualizada"
                        })                 
                    }
                })
        }

    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }

}
        

export const deletePersonasNaturales = async (req: Request, res:Response) => {
    const id:any=req.params.id;
    try {
        var persona: any = await PersonasNaturales.findOne({where: {id_persona: id} })

        if(persona) {
            let image: any = persona['imagen'];

            if(image == "muestra.png"){
                PersonasNaturales.destroy({where: {id_persona: id}});
                res.json({
                    msg: "Deleted"
                })
            }else{
                const filePath = path.join(__dirname, './../../public/images', `${image}`)

                const filepath = path.resolve(`${filePath}`)
                await fs.unlink(filepath);
                
                PersonasNaturales.destroy({where: {id_persona: id}});

                res.json({
                    msg: "Deleted"
                })
            }
            
        }else{
            return res.status(400).json({
             msg: "Persona Natural no encontrada"
          })
        }

    } catch (error) {
        res.status(500).json({
            msg: "Something wrong"+error 
        })
    }
}
 
function uuidv4() {
    throw new Error('Function not implemented.');
}

