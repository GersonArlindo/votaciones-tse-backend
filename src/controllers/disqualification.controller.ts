import { Request, Response } from 'express'
import Disqualification from './../models/disqualification'

export const getDisqualification = async (req: Request, res: Response) => {
    try {
        const disqualification = await Disqualification.findAll({ order: [['disqualification_id', 'DESC'],] });
        res.json({
            disqualification
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}

export const getDisqualificationById = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const disqualification = await Disqualification.findOne({ where: { disqualification_id: id } })
        if (!disqualification) {
            return res.status(400).json({
             msg: "Disqualification doesn't exist"
          })
        }else{
            return res.json({
                disqualification
            })
        }
    } catch (error) {
        res.json({
            Msg: "Error: " + error
        })
    }
}

export const createDisqualification = async (req: Request, res: Response) => {
    try {
        const { disqualification_name } = req.body;
        var datas;
        datas = { disqualification_name }
        let disqualification = await Disqualification.create(datas);
        const disqualification_id = disqualification.previous('disqualification_id')
        res.json({
            msg: "Created",
            "id": disqualification_id
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}


export const updateDisqualification = async (req: Request, res: Response) => {
    try {
        const id: any = req.params.id;
        const { disqualification_name } = req.body;
        var datas;
        datas = { disqualification_name }
        const disqualification: any = await Disqualification.findByPk(id)
        disqualification.update(datas)
        res.json({
            msg: "Disqualification updated"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }

}

export const deleteDisqualification = async (req: Request, res:Response) => {
    const id:any=req.params.id;
    try {
        const disqualification = await Disqualification.findOne({where: {disqualification_id:id} })
        if (!disqualification) {
            return res.status(400).json({
             msg: "Disqualification doesn't exist"
          })
        }
        Disqualification.destroy({where: {disqualification_id: id}});
        res.json({
            msg: "Deleted"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Something wrong"+error 
        })
    }
}
