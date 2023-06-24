import { Request, Response } from 'express'
import Role from './../models/role'

export const getRole = async (req: Request, res: Response) => {
    try {
        const role = await Role.findAll({ order: [['rol_id', 'DESC'],] });
        res.json({
            role
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}

export const getRoleById = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const role = await Role.findOne({ where: { rol_id: id } })
        if (!role) {
            return res.status(400).json({
             msg: "Role doesn't exist"
          })
        }else{
            return res.json({
                role
            })
        }
    } catch (error) {
        res.json({
            Msg: "Error: " + error
        })
    }
}

export const createRole = async (req: Request, res: Response) => {
    try {
        const { rol_rol, rol_descripcion } = req.body;
        var datas;
        datas = { rol_rol, rol_descripcion }
        let role = await Role.create(datas);
        const rol_id = role.previous('rol_id')
        res.json({
            msg: "Created",
            "id": rol_id
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}

export const updateRole = async (req: Request, res: Response) => {
    try {
        const id: any = req.params.id;
        const { rol_rol, rol_descripcion } = req.body;
        var datas;
        datas = { rol_rol, rol_descripcion }
        const role: any = await Role.findByPk(id)
        role.update(datas)
        res.json({
            msg: "Role updated"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }

}

export const deleteRole = async (req: Request, res:Response) => {
    const id:any=req.params.id;
    try {
        const role = await Role.findOne({where: {rol_id:id} })
        if (!role) {
            return res.status(400).json({
             msg: "Role doesn't exist"
          })
        }
        Role.destroy({where: {rol_id: id}});
        res.json({
            msg: "Deleted"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Something wrong"+error 
        })
    }
}
