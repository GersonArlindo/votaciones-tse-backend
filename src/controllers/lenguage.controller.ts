import { Request, Response } from 'express'
import Language from './../models/lenguage'

export const getLanguage = async (req: Request, res: Response) => {
    try {
        const lenguage = await Language.findAll({ order: [['language_id', 'DESC'],] });
        res.json({
            lenguage
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}

export const getLanguageById = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const lenguage = await Language.findOne({ where: { language_id: id } })
        if (!lenguage) {
            return res.status(400).json({
             msg: "lenguage doesn't exist"
          })
        }else{
            return res.json({
                lenguage
            })
        }
    } catch (error) {
        res.json({
            Msg: "Error: " + error
        })
    }
}

export const createLanguage = async (req: Request, res: Response) => {
    try {
        const { language_name } = req.body;
        var datas;
        datas = { language_name }
        let lenguage = await Language.create(datas);
        const language_id = lenguage.previous('language_id')
        res.json({
            msg: "Created",
            "id": language_id
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}


export const updateLanguage = async (req: Request, res: Response) => {
    try {
        const id: any = req.params.id;
        const { language_name } = req.body;
        var datas;
        datas = { language_name }
        const lenguage: any = await Language.findByPk(id)
        lenguage.update(datas)
        res.json({
            msg: "Lenguage updated"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }

}

export const deleteLanguage = async (req: Request, res:Response) => {
    const id:any=req.params.id;
    try {
        const language = await Language.findOne({where: {language_id:id} })
        if (!language) {
            return res.status(400).json({
             msg: "Lenguage doesn't exist"
          })
        }
        Language.destroy({where: {language_id: id}});
        res.json({
            msg: "Deleted"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Something wrong"+error 
        })
    }
}
