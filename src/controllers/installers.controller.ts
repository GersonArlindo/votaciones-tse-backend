import path from 'path';
import bcryp from 'bcryptjs';
import { Request, Response } from 'express'
import Installers from './../models/installers'
import States from '../models/states';
import { v4 as uuidv4 } from 'uuid';
import { format } from "util";
import fs from 'fs';
import { uploadFile } from '../middlewares/uploadToS3';
import util from "util";

const salt = bcryp.genSaltSync();
const unlinkFile = util.promisify(fs.unlink);

//relacion entre permisos y modulos
Installers.belongsTo(States, { foreignKey: "state_id" })
States.hasMany(Installers, { foreignKey: "state_id" })

export const getInstallers = async (req: Request, res: Response) => {
    try {
        const installers = await Installers.findAll({ include: [{
            model: States,
            attributes: ["state_id", "name_state", "covered_virtually", "covered_inperson", "status"]
          }],
          
          order: [['installer_id', 'DESC'],] });
        res.json({
            installers
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}

export const getInstallersById = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const installers = await Installers.findOne({ include: [{
            model: States,
            attributes: ["state_id", "name_state", "covered_virtually", "covered_inperson", "status"]
          }],
          
          where: { installer_id: id } })
          
        if (!Installers) {
            return res.status(400).json({
             msg: "Installer doesn't exist"
          })
        }else{
            return res.json({
                installers
            })
        }
    } catch (error) {
        res.json({
            Msg: "Error: " + error
        })
    }
}

export const createInstallers = async (req: Request, res: Response) => {98
    try {
        const { epc_name, state_id, contact_email, installers_phone, created_by } = req.body;

        var datas;
        if(!req.files){
            const states = await States.findByPk(state_id)

            if(!states){
                res.json({
                    msg: "This State not exits"
                })
            }else{
                datas = { epc_name, state_id, installers_images: `https://ez-marketing-bucket.s3.us-east-2.amazonaws.com/muestra.png`, contact_email, installers_phone, created_by }
                let installers = await Installers.create(datas);
                const installer_id = installers.previous('installer_id')
                res.json({
                    msg: "Created",
                    "id": installer_id
                })
            }
            
        }else{
            const { installers_images }: any = req.files;
            
            const states = await States.findByPk(state_id)

            if(!states){
                res.json({
                    msg: "This State not exits"
                })
            }else{
                const extencion = installers_images.name.split('.').pop();
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

                const result = await uploadFile(installers_images.tempFilePath, "installers/", nameUnic, `${installers_images.mimetype}`);  // Calling above function in s3.js
        
                await unlinkFile(installers_images.tempFilePath);

                const publicImg = `https://ez-marketing-bucket.s3.us-east-2.amazonaws.com/${nameUnic}`;

                datas = { epc_name, state_id, installers_images: publicImg, contact_email, installers_phone, created_by }

                // inserta los datos en la base
                const users = await Installers.create(datas);
                const installer_id = users.previous('installer_id')

                res.json({
                    msg: "Created",
                    "id": installer_id
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}


export const updateInstallers = async (req: Request, res: Response) => {
    try {
        const id: any = req.params.id;

        const { epc_name, state_id, contact_email, installers_phone, created_by } = req.body;

        var datas;
        if(!req.files){
            const states = await States.findByPk(state_id)

            if(!states){
                res.json({
                    msg: "This State not exits"
                })
            }else{
                datas = { epc_name, state_id, contact_email, installers_phone, created_by }

                const installers: any = await Installers.findByPk(id)
                installers.update(datas)
                res.json({
                    msg: "Installer updated"
                })
            }
        }else{
            const { installers_images }: any = req.files;

            const states = await States.findByPk(state_id)

            if(!states){
                res.json({
                    msg: "This State not exits"
                })
            }else{
                const extencion = installers_images.name.split('.').pop();
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

                const result = await uploadFile(installers_images.tempFilePath, "installers/", nameUnic, `${installers_images.mimetype}`);  // Calling above function in s3.js
                    
                await unlinkFile(installers_images.tempFilePath);
                
                const publicImg = `https://ez-marketing-bucket.s3.us-east-2.amazonaws.com/${nameUnic}`;

                datas = { epc_name, state_id, installers_images: publicImg, contact_email, installers_phone, created_by }

                // inserta los datos en la base
                const installers: any = await Installers.findByPk(id)
                installers.update(datas)
                res.json({
                    msg: "Installer updated"
                })
            }
        }

    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }

}

export const deleteInstallers = async (req: Request, res:Response) => {
    const id:any=req.params.id;
    try {
        const installers = await Installers.findOne({where: {installer_id: id} })
        if (!installers) {
            return res.status(400).json({
             msg: "Installer doesn't exist"
          })
        }
        Installers.destroy({where: {installer_id: id}});
        res.json({
            msg: "Deleted"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Something wrong"+error 
        })
    }
}
