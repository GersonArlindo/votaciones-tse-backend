import { Request, Response } from 'express'
import Energy_Provider from './../models/energy_provider'

export const getEnergyProvider = async (req: Request, res: Response) => {
    try {
        const energy_provider = await Energy_Provider.findAll({ order: [['energy_provider_id', 'DESC'],] });
        res.json({
            energy_provider
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}

export const getEnergyProviderById = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const energy_provider = await Energy_Provider.findOne({ where: { energy_provider_id: id } })
        if (!energy_provider) {
            return res.status(400).json({
             msg: "energy_provider doesn't exist"
          })
        }else{
            return res.json({
                energy_provider
            })
        }
    } catch (error) {
        res.json({
            Msg: "Error: " + error
        })
    }
}

export const createEnergyProvider = async (req: Request, res: Response) => {
    try {
        const { energy_provider_name, energy_provider_description } = req.body;
        var datas;
        datas = { energy_provider_name, energy_provider_description }
        let energy_provider = await Energy_Provider.create(datas);
        const energy_provider_id = energy_provider.previous('energy_provider_id')
        res.json({
            msg: "Created",
            "id": energy_provider_id
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}


export const updateEnergyProvider = async (req: Request, res: Response) => {
    try {
        const id: any = req.params.id;
        const { energy_provider_name, energy_provider_description } = req.body;
        var datas;
        datas = { energy_provider_name, energy_provider_description }
        const energy_provider: any = await Energy_Provider.findByPk(id)
        energy_provider.update(datas)
        res.json({
            msg: "energy_provider updated"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }

}


export const deleteEnergyProvider = async (req: Request, res:Response) => {
    const id:any=req.params.id;
    try {
        const energy_provider = await Energy_Provider.findOne({where: {energy_provider_id:id} })
        if (!energy_provider) {
            return res.status(400).json({
             msg: "energy_provider doesn't exist"
          })
        }
        Energy_Provider.destroy({where: {energy_provider_id: id}});
        res.json({
            msg: "Deleted"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Something wrong"+error 
        })
    }
}
