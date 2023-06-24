import { Request, Response } from 'express'
import Roof from './../models/type_roof'

export const getRoof = async (req: Request, res: Response) => {
    try {
        const roof = await Roof.findAll({ order: [['roof_id', 'DESC'],] });
        res.json({
            roof
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}

export const getRoofById = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const roof = await Roof.findOne({ where: { roof_id: id } })
        if (!roof) {
            return res.status(400).json({
             msg: "roof doesn't exist"
          })
        }else{
            return res.json({
                roof
            })
        }
    } catch (error) {
        res.json({
            Msg: "Error: " + error
        })
    }
}

export const createRoof = async (req: Request, res: Response) => {
    try {
        const { roof_name, description_roof } = req.body;
        var datas;
        datas = { roof_name, description_roof }
        let roof = await Roof.create(datas);
        const roof_id = roof.previous('roof_id')
        res.json({
            msg: "Created",
            "id": roof_id
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}


export const updateRoof = async (req: Request, res: Response) => {
    try {
        const id: any = req.params.id;
        const { roof_name, description_roof } = req.body;
        var datas;
        datas = { roof_name, description_roof }
        const roof: any = await Roof.findByPk(id)
        roof.update(datas)
        res.json({
            msg: "Roof updated"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }

}

export const deleteRoof = async (req: Request, res:Response) => {
    const id:any=req.params.id;
    try {
        const roof = await Roof.findOne({where: {roof_id:id} })
        if (!roof) {
            return res.status(400).json({
             msg: "Roof doesn't exist"
          })
        }
        Roof.destroy({where: {roof_id: id}});
        res.json({
            msg: "Deleted"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Something wrong"+error 
        })
    }
}
