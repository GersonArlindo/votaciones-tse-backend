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
import UploadDocument from "../models/upload_document";

const s3 = new S3({
  accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
  secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
  region: 'us-east-2' ,
});

export const getResourcesDoc = async (req: Request, res: Response) => {
    try {
        const id: any = req.query.id;

        const resources = await UploadDocument.findAll({
            where: { appointment_id: id }, order: [['id_document_bill', 'DESC'],],
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

export const uploadElementsDoc = async (req: Request, res: Response) => {
    try {
        const { ruta_document }: any = req.files
        const { appointment_id, status } = req.body

        let nameUnic = "";
        let carpeta = "docbill"

        if (ruta_document) {
            const document = ruta_document;

            const extencion = document.name.split('.').pop();
            nameUnic = uuidv4() + "." + extencion;

            if (extencion == "xlsx") {
                return res.status(400).json({ msg: "Please upload a valid image!" });
            }
            if (extencion == "jfif"){
                return res.status(400).json({ msg: "Please upload a valid image!" });
            }

            const result = await uploadFile(document.tempFilePath, `${carpeta}/`, nameUnic, `${document.mimetype}`);  // Calling above function in s3.js
                    
            await unlinkFile(document.tempFilePath);

            const data = {
                appointment_id: appointment_id,
                ruta_document: nameUnic,
                status: status
            }

            await UploadDocument.create(data);

        } else {

            for (let i = 0; i < ruta_document.length; i++) {

                const document = ruta_document[i];
                const extencion = document.name.split('.').pop();
                nameUnic = uuidv4() + "." + extencion;

                if (extencion == "xlsx") {
                    return res.status(400).json({ msg: "Please upload a valid image!" });
                }
                if (extencion == "jfif"){
                    return res.status(400).json({ msg: "Please upload a valid image!" });
                }

                const result = await uploadFile(document.tempFilePath, `${carpeta}/`, nameUnic, `${document.mimetype}`);  // Calling above function in s3.js
                    
                await unlinkFile(document.tempFilePath);

                const data = {
                    appointment_id: appointment_id,
                    ruta_document: nameUnic,
                    status: status
                }
    
                await UploadDocument.create(data);
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

export const deleteElementsDoc = async (req: Request, res: Response) => {
    try {
        const { name } :any = req.query;
        
        let carpeta = "docbill";

        const resources = await UploadDocument.findOne({ where: { ruta_document: name } });
        
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
