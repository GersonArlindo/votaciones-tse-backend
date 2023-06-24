import { Request, Response } from 'express'
import Modules from './../models/modules'
import db from '../db/connection.db';

export const getModules = async (req: Request, res: Response) => {
    try {
        const module = await Modules.findAll({ order: [['mod_id', 'DESC'],] });
        res.json({
            module
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}

export const getModulesById = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const module = await Modules.findOne({ where: { mod_id: id } })
        if (!module) {
            return res.status(400).json({
             msg: "module doesn't exist"
          })
        }else{
            return res.json({
                module
            })
        }
    } catch (error) {
        res.json({
            Msg: "Error: " + error
        })
    }
}

export const createModules = async (req: Request, res: Response) => {
    try {
        const { mod_nombre } = req.body;
        var datas;
        datas = { mod_nombre }
        let modules = await Modules.create(datas);
        const mod_id = modules.previous('mod_id')
        res.json({
            msg: "Created",
            "id": mod_id
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}


export const updateModules = async (req: Request, res: Response) => {
    try {
        const id: any = req.params.id;
        const { mod_nombre } = req.body;
        var datas;
        datas = { mod_nombre }
        const modules: any = await Modules.findByPk(id)
        modules.update(datas)
        res.json({
            msg: "Modules updated"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }

}

export const deleteModules = async (req: Request, res:Response) => {
    const id:any=req.params.id;
    try {
        const modules = await Modules.findOne({where: {mod_id:id} })
        if (!modules) {
            return res.status(400).json({
             msg: "modules doesn't exist"
          })
        }
        Modules.destroy({where: {mod_id: id}});
        res.json({
            msg: "Deleted"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Something wrong"+error 
        })
    }
}

export const roleModule=async (req:Request,res:Response)=>{
    const rol_id=req.params.rol_id
    try {
        const module = await db.query('call MODULE_POSITION('+rol_id+');');
        if (!module) {
            return res.json({
                msg: "Not have a module in this page"
            })
        }
        res.json({module})

    } catch (error) {
        res.status(500).json({ msg: error})
    }
}