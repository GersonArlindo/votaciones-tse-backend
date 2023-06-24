import { Request, Response } from 'express'
import Permission from './../models/permission'
import Modules from '../models/modules';
import Role from '../models/role';

//relacion entre permisos y modulos
Permission.belongsTo(Modules, { foreignKey: "mod_id" })
Modules.hasMany(Permission, { foreignKey: "mod_id" })

Permission.belongsTo(Role, { foreignKey: "rol_id" })
Role.hasMany(Permission, { foreignKey: "rol_id" })

export const getPermission = async (req: Request, res: Response) => {
    try {
        const permission = await Permission.findAll({ include: [{
            model: Modules,
            attributes: ["mod_id", "mod_nombre"]
        },{
            model: Role,
            attributes: ["rol_id", "rol_rol", "rol_descripcion"]
        }],

        order: [['per_id', 'DESC'],] });

        res.json({
            permission
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}

export const getPermissionByRole = async (req: Request, res: Response) => {
    const id = req.params.rol_id

    try {
        const permission = await Permission.findAll({ include: [{
                model: Modules,
                attributes: ["mod_id", "mod_nombre"]
            },{
                model: Role,
                attributes: ["rol_id", "rol_rol", "rol_descripcion"]
            }],

            where: {
                rol_id: id
            },

            order: [['per_id', 'DESC'],] 
        });

        res.json({
            permission
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}


export const getPermissionById = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const permission = await Permission.findOne({ include: [{
            model: Modules,
            attributes: ["mod_id", "mod_nombre"]
        },{
            model: Role,
            attributes: ["rol_id", "rol_rol", "rol_descripcion"]
        }],
        
        where: { per_id: id } })
        
        if (!permission) {
            return res.status(400).json({
             msg: "permission doesn't exist"
          })
        }else{
            return res.json({
                permission
            })
        }
    } catch (error) {
        res.json({
            Msg: "Error: " + error
        })
    }
}

export const createPermission = async (req: Request, res: Response) => {
    try {
        const { per_nombre, mod_id, rol_id, create, read, update, deleted, status } = req.body;
        const module = await Modules.findByPk(mod_id);
        if (!module) {
            return res.json({ 
                msg: "This module not exits"
            })
        }else{
            var datas;
            datas = { per_nombre, mod_id, rol_id, create, read, update, deleted, status }
            let permission = await Permission.create(datas);
            const per_id = permission.previous('per_id')
            
            res.json({
                msg: "Created",
                "id": per_id
            })
        }

    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}


export const updatePermission = async (req: Request, res: Response) => {
    try {
        const id: any = req.params.id;
        const { per_nombre, mod_id, rol_id, create, read, update, deleted, status } = req.body;

        const module = await Modules.findByPk(mod_id);
        if (!module) {
            return res.json({ 
                msg: "This module not exits"
            })
        }else{
            var datas;
            datas = { per_nombre, mod_id, rol_id, create, read, update, deleted, status }
            const permission: any = await Permission.findByPk(id)
            permission.update(datas)
            res.json({
                msg: "permission updated"
            })
        }
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }

}

export const deletePermission = async (req: Request, res:Response) => {
    const id:any=req.params.id;
    try {
        const permission = await Permission.findOne({where: {per_id: id} })
        if (!permission) {
            return res.status(400).json({
             msg: "permission doesn't exist"
          })
        }
        Permission.destroy({where: {per_id: id}});
        res.json({
            msg: "Deleted"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Something wrong"+error 
        })
    }
}

export const changePermission = async (req: Request, res: Response) => {
    try {
      const status: any = req.params.status
      const type: any = req.query.type;
      const id: any = req.query.id;
  
      const permission = await Permission.findOne({ where: { per_id: id } });
  
      if (!permission) {
        return res.json({
          msg: "Not have a permission in this page"
        })
      }else{
        await Permission.findByPk(id);

        if(type == 1){
            permission.update({ create: status });  
            return res.json({
                msg: "Change Create"
            })
        }if(type == 2){
            permission.update({ read: status });  
            return res.json({
                msg: "Change Read"
            })
        }if(type == 3){
            permission.update({ update: status });  
            return res.json({
                msg: "Change Update"
            })
        }if(type == 4){
            permission.update({ deleted: status });  
            return res.json({
                msg: "Change Delete"
            })
        }if(type == 5){
            permission.update({ status: status });  
            return res.json({
                msg: "Change Status"
            })
        }else{
            return res.json({
                msg: "Type no exits"
            })
        }
  
      }
  
    } catch (error) {
      res.status(500).json({
        msg: "Something wrong" + error
      })
    }
  } 