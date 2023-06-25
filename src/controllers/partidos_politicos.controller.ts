import bcryp from 'bcryptjs';
import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid';
import PartidosPoliticos from '../models/partidos_politicos';
import Role from '../models/role';
const fs = require('fs').promises;
import { uploadFile } from '../middlewares/uploadToS3';
import util from "util";
import path from 'path';

const unlinkFile = util.promisify(fs.unlink);


const salt = bcryp.genSaltSync();

export const getPartidosPoliticos = async (req: Request, res: Response) => {
    try {
        const partidosPoliticos = await PartidosPoliticos.findAll({ order: [['id_partido', 'DESC'],] });
        res.json({
            partidosPoliticos
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}

export const getPartidosPoliticosById = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const partidosPoliticos = await PartidosPoliticos.findOne({ where: { id_partido: id } })
        if (!partidosPoliticos) {
            return res.status(400).json({
             msg: "partidosPoliticos doesn't exist"
          })
        }else{
            return res.json({
                partidosPoliticos
            })
        }
    } catch (error) {
        res.json({
            Msg: "Error: " + error
        })
    }
}

export const createPartidosPoliticos = async (req: Request, res: Response) => {
    try {
        const { nombre, sigla, direccion, telefono, representante_legal, estado} = req.body;
        var datas;
        if(!req.files){
            datas = { nombre, sigla, direccion, telefono, representante_legal, estado, imagen: `muestra.png` }
            
            let partidosPoliticos = await PartidosPoliticos.create(datas);
            const id_partido  = partidosPoliticos.previous('id_partido')
            res.json({
                msg: "Created",
                "id": id_partido 
            })
        }else{
            const { imagen }: any = req.files;
            
            const filePath = path.join(__dirname, './../../public/images', `${imagen.name}`)
            const extencion = imagen.name.split('.').pop();
            const nameUnic = uuidv4() + "." + extencion;

            if (extencion == "pdf") {
                return res.status(400).json({ msg: "Please upload a valid image!" });
            }if (extencion == "doc") {
                return res.status(400).json({ msg: "Please upload a valid image!" });
            }if (extencion == "xlsx") {
                return res.status(400).json({ msg: "Please upload a valid image!" });
            }if (extencion == "jfif"){
                return res.status(400).json({ msg: "Please upload a valid image!" });
            }

            const publicImg = `${imagen.name}`;

            imagen.mv(filePath, async (err: any) => {
                if (err) {
                    return res.status(500).send(err)
                }else{
                    datas = { nombre, sigla, direccion, telefono, representante_legal, estado, imagen: publicImg }

                    // inserta los datos en la base
                    const partidosPoliticos = await PartidosPoliticos.create(datas);
                    const id_partido = partidosPoliticos.previous('id_partido')

                    res.json({
                        msg: "Created",
                        "id": id_partido
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

export const updatePartidosPoliticos = async (req: Request, res: Response) => {
    try {
        const id: any = req.params.id;

        const { nombre, sigla, direccion, telefono, representante_legal, estado } = req.body;

        var datas;
        if(!req.files){
            datas = {nombre, sigla, direccion, telefono, representante_legal, estado }

            const partidosPoliticos: any = await PartidosPoliticos.findByPk(id)
            partidosPoliticos.update(datas)
            res.json({
                msg: "Partido Politico updated"
            })
        }else{
            const { imagen }: any = req.files;

            const filePath = path.join(__dirname, './../../public/images', `${imagen.name}`)
                const extencion = imagen.name.split('.').pop();
                const nameUnic = uuidv4() + "." + extencion;

                if (extencion == "pdf") {
                    return res.status(400).json({ msg: "Please upload a valid image!" });
                }if (extencion == "doc") {
                    return res.status(400).json({ msg: "Please upload a valid image!" });
                }if (extencion == "xlsx") {
                    return res.status(400).json({ msg: "Please upload a valid image!" });
                }if (extencion == "jfif"){
                    return res.status(400).json({ msg: "Please upload a valid image!" });
                }
                const publicImg = `${imagen.name}`;

                imagen.mv(filePath, async (err: any) => {
                    if (err) {
                        return res.status(500).send(err)
                    }else{
                        datas = { nombre, sigla, direccion, telefono, representante_legal, estado, imagen: publicImg }

                        // inserta los datos en la base
                        const partidosPoliticos: any = await PartidosPoliticos.findByPk(id)

                        partidosPoliticos.update(datas)

                        res.json({
                            msg: "Partido politico updated"
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

export const deletePartidosPoliticos = async (req: Request, res:Response) => {
    const id:any=req.params.id;
    try {
        var partidosPoliticos: any = await PartidosPoliticos.findOne({where: {id_partido: id} })

        if(partidosPoliticos) {
            let image: any = partidosPoliticos['imagen'];

            if(image == "muestra.png"){
                PartidosPoliticos.destroy({where: {id_partido: id}});
                res.json({
                    msg: "Deleted"
                })
            }else{
                const filePath = path.join(__dirname, './../../public/images', `${image}`)

                const filepath = path.resolve(`${filePath}`)
                await fs.unlink(filepath);
                
                PartidosPoliticos.destroy({where: {id_partido: id}});

                res.json({
                    msg: "Deleted"
                })
            }
            
        }else{
            return res.status(400).json({
             msg: "partido politico doesn't exist"
          })
        }

    } catch (error) {
        res.status(500).json({
            msg: "Something wrong"+error 
        })
    }
}
