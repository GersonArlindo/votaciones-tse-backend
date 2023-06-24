import { Request, Response } from 'express'
import PasswordMaster from './../models/password_master'

export const getPasswordMaster = async (req: Request, res: Response) => {
    try {
        const passwordMaster = await PasswordMaster.findAll({ order: [['password_id', 'DESC'],] });
        res.json({
            passwordMaster
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}

export const getPasswordMasterById = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const passwordMaster = await PasswordMaster.findOne({ where: { password_id: id } })
        if (!passwordMaster) {
            return res.status(400).json({
             msg: "passwordMaster doesn't exist"
          })
        }else{
            return res.json({
                passwordMaster
            })
        }
    } catch (error) {
        res.json({
            Msg: "Error: " + error
        })
    }
}

export const createPasswordMaster = async (req: Request, res: Response) => {
    try {
        const { website_name, website_image, username, password, link_page, description, created_by } = req.body;
        var datas;
        datas = { website_name, website_image, username, password, link_page, description, created_by }
        let passwordMaster = await PasswordMaster.create(datas);
        const password_id = passwordMaster.previous('password_id')
        res.json({
            msg: "Created",
            "id": password_id
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}


export const updatePasswordMaster = async (req: Request, res: Response) => {
    try {
        const id: any = req.params.id;
        const { website_name, website_image, username, password, link_page, description, created_by } = req.body;
        var datas;
        datas = { website_name, website_image, username, password, link_page, description, created_by }
        const passwordMaster: any = await PasswordMaster.findByPk(id)
        passwordMaster.update(datas)
        res.json({
            msg: "passwordMaster updated"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }

}

export const deletePasswordMaster = async (req: Request, res:Response) => {
    const id:any=req.params.id;
    try {
        const passwordMaster = await PasswordMaster.findOne({where: {password_id:id} })
        if (!passwordMaster) {
            return res.status(400).json({
             msg: "passwordMaster doesn't exist"
          })
        }
        PasswordMaster.destroy({where: {password_id: id}});
        res.json({
            msg: "Deleted"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Something wrong"+error 
        })
    }
}
