import { Request, Response, NextFunction } from "express";
import path from "path";
import { format } from "util";
import { v4 as uuidv4 } from 'uuid';
import { uploadFile } from "../middlewares/uploadToS3";

import fs from 'fs';
import util from "util";
const Path = require('path')  
const unlinkFile = util.promisify(fs.unlink);

require("dotenv").config();
import S3 from "aws-sdk/clients/s3";
import UploadAudio from "../models/upload_audio";


const s3 = new S3({
  accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
  secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
  region: 'us-east-1' ,
});

export const getResourcesAudio = async (req: Request, res: Response) => {
    try {
        const id: any = req.query.id;

        const resources = await UploadAudio.findAll({
            where: { appointment_id: id }, order: [['id_audio', 'DESC'],],
        });
        res.json({
            resources
        })
    } catch (error) {
        res.status(500).json({
            msg: "Something wrong" + error
        })
    }
}

export const uploadElementsAudio = async (req: Request, res: Response) => {
    try {
        const { ruta_audio }: any = req.files
        const { appointment_id, type_audio } = req.body

        let nameUnic = "";
        let carpeta = "docbill"

        if (ruta_audio) {
            const audio = ruta_audio;

            const extencion = audio.name.split('.').pop();
            nameUnic = uuidv4() + "." + extencion;

            if (extencion == "xlsx") {
                return res.status(400).json({ msg: "Please upload a valid image!" });
            }
            if (extencion == "jfif"){
                return res.status(400).json({ msg: "Please upload a valid image!" });
            }

            const result = await uploadFile(audio.tempFilePath, `${carpeta}/`, nameUnic, `${audio.mimetype}`);  // Calling above function in s3.js
                    
            await unlinkFile(audio.tempFilePath);

            const data = {
                appointment_id: appointment_id,
                ruta_audio: nameUnic,
                type_audio: type_audio
            }

            await UploadAudio.create(data);

        } else {

            for (let i = 0; i < ruta_audio.length; i++) {

                const audio = ruta_audio[i];
                const extencion = ruta_audio.name.split('.').pop();
                nameUnic = uuidv4() + "." + extencion;

                if (extencion == "xlsx") {
                    return res.status(400).json({ msg: "Please upload a valid image!" });
                }
                if (extencion == "jfif"){
                    return res.status(400).json({ msg: "Please upload a valid image!" });
                }

                const result = await uploadFile(audio.tempFilePath, `${carpeta}/`, nameUnic, `${audio.mimetype}`);  // Calling above function in s3.js
                    
                await unlinkFile(audio.tempFilePath);

                const data = {
                    appointment_id: appointment_id,
                    ruta_document: nameUnic,
                    status: status
                }
    
                await UploadAudio.create(data);
            }
        }

        res.json({
            msg: "Resources created"
        })

    } catch (error) {
        res.status(500).json({
            msg: 'error' + error
        })

    }
}

export const deleteElementsAudio = async (req: Request, res: Response) => {
    try {
        const { name } :any = req.query;
        
        let carpeta = "docbill";

        const resources = await UploadAudio.findOne({ where: { ruta_document: name } });
        
        if (!resources) {
            return res.status(404).json({
                msg: "Not found"
            })
        }

        const blob = `${name}`;

        const params = {
            Bucket : 'ez-marketing-bucket',
            Key: `${blob}`
        };
        
        s3.deleteObject(params, async (error, data) => {
            if (error) {
                res.status(500).send(error);
            }else{
                await resources.destroy();
                res.json({
                    msg: "Element delete"
                })
            }
        });
        
    } catch (error) {
        res.status(500).json({
            msg: "Something wrong" + error
        })
    }
}
