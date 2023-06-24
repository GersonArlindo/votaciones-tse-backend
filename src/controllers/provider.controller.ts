import bcryp from 'bcryptjs';
import { Request, Response } from 'express'
import Provider from './../models/provider'
import Language from './../models/lenguage';
import Role from '../models/role';

const salt = bcryp.genSaltSync();

export const getProvider = async (req: Request, res: Response) => {
    try {
        const provider = await Provider.findAll({ order: [['provider_id', 'DESC'],] });
        res.json({
            provider
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}

export const getProviderById = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const provider = await Provider.findOne({ where: { provider_id: id } })
        if (!Provider) {
            return res.status(400).json({
             msg: "Provider doesn't exist"
          })
        }else{
            return res.json({
                provider
            })
        }
    } catch (error) {
        res.json({
            Msg: "Error: " + error
        })
    }
}

export const createProvider = async (req: Request, res: Response) => {
    try {
        const { name_provider, description_provider, status } = req.body;
        var datas;
        datas = { name_provider, description_provider, status }
        let provider = await Provider.create(datas);
        const provider_id = provider.previous('provider_id')
        res.json({
            msg: "Created",
            "id": provider_id
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}


export const updateProvider = async (req: Request, res: Response) => {
    try {
        const id: any = req.params.id;
        const { name_provider, description_provider, status  } = req.body;
        var datas;
        datas = { name_provider, description_provider, status  }
        const provider: any = await Provider.findByPk(id)
        provider.update(datas)
        res.json({
            msg: "Provider updated"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }

}

export const deleteProvider = async (req: Request, res:Response) => {
    const id:any=req.params.id;
    try {
        const provider = await Provider.findOne({where: {provider_id: id} })
        if (!provider) {
            return res.status(400).json({
             msg: "provider doesn't exist"
          })
        }
        Provider.destroy({where: {provider_id: id}});
        res.json({
            msg: "Deleted"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Something wrong"+error 
        })
    }
}
