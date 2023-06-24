import { Request, Response, NextFunction } from "express";
import path from "path";
import { format } from "util";
import { v4 as uuidv4 } from 'uuid';
import UploadImage from "../models/upload_images";
import { uploadFile } from "../middlewares/uploadToS3";

import fs from 'fs';
import util from "util";
const Path = require('path')  
const unlinkFile = util.promisify(fs.unlink);

require("dotenv").config();
import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
  accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
  secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
  region: 'us-east-1' ,
});

export const getResources = async (req: Request, res: Response) => {
    try {
        const tipo: any = req.query.type;
        const id: any = req.query.id;

        const resources = await UploadImage.findAll({
            where: { type_img: tipo, appointment_id: id }, order: [['id_image', 'DESC'],],
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

export const uploadElements = async (req: Request, res: Response) => {
    try {
        const { ruta_image }: any = req.files
        const { type_img, appointment_id } = req.body

        let nameUnic = "";
        let carpeta = Tipo_carpeta(type_img[0])

        if (ruta_image) {
            const foto = ruta_image;

            const extencion = foto.name.split('.').pop();
            nameUnic = uuidv4() + "." + extencion;

            if (extencion == "pdf") {
                return res.status(400).json({ msg: "Please upload a valid image!" });
            }
            if (extencion == "doc") {
                return res.status(400).json({ msg: "Please upload a valid image!" });
            }
            if (extencion == "xlsx") {
                return res.status(400).json({ msg: "Please upload a valid image!" });
            }
            if (extencion == "jfif"){
                return res.status(400).json({ msg: "Please upload a valid image!" });
            }

            const result = await uploadFile(foto.tempFilePath, `${carpeta}/`, nameUnic, `${foto.mimetype}`);  // Calling above function in s3.js
                    
            await unlinkFile(foto.tempFilePath);

            const data =
            {
                type_img: type_img,
                appointment_id: appointment_id,
                ruta_image: nameUnic
            }

            await UploadImage.create(data);

        } else {

            for (let i = 0; i < ruta_image.length; i++) {

                const foto = ruta_image[i];
                const extencion = foto.name.split('.').pop();
                nameUnic = uuidv4() + "." + extencion;

                if (extencion == "pdf") {
                    return res.status(400).json({ msg: "Please upload a valid image!" });
                }
                if (extencion == "doc") {
                    return res.status(400).json({ msg: "Please upload a valid image!" });
                }
                if (extencion == "xlsx") {
                    return res.status(400).json({ msg: "Please upload a valid image!" });
                }
                if (extencion == "jfif"){
                    return res.status(400).json({ msg: "Please upload a valid image!" });
                }

                const result = await uploadFile(foto.tempFilePath, `${carpeta}/`, nameUnic, `${foto.mimetype}`);  // Calling above function in s3.js
                    
                await unlinkFile(foto.tempFilePath);

                const data =
                {
                    type_img: type_img,
                    appointment_id: appointment_id,
                    ruta_image: nameUnic
                }
                
                await UploadImage.create(data);
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

export const deleteElements = async (req: Request, res: Response) => {
    try {
        const { name, type } :any = req.query;
        
        let carpeta = Tipo_carpeta(type);

        const resources = await UploadImage.findOne({ where: { ruta_image: name } });
        
        if (!resources) {
            return res.status(404).json({
                msg: "Not found"
            })
        }

        const blob = `${carpeta}/${name}`;

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

const Tipo_carpeta = (type: any) => {
    let carpeta = ""
    switch (type) {
        case "1":
            carpeta = "assign_appointment"
            break;
    }

    return carpeta;
}