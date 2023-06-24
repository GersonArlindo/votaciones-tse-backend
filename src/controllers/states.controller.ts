import bcryp from 'bcryptjs';
import { Request, Response } from 'express'
import Provider from './../models/provider'
import States from './../models/states'
import Language from './../models/lenguage';
import Role from '../models/role';
const salt = bcryp.genSaltSync();

export const getStates = async (req: Request, res: Response) => {
    try {
        const states = await States.findAll({ order: [['state_id', 'DESC'],] });
        res.json({
            states
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}

export const getStatesById = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const states = await States.findOne({ where: { state_id: id } })
        if (!States) {
            return res.status(400).json({
             msg: "State doesn't exist"
          })
        }else{
            return res.json({
                states
            })
        }
    } catch (error) {
        res.json({
            Msg: "Error: " + error
        })
    }
}

export const createStates = async (req: Request, res: Response) => {
    try {
        const { name_state,abbreviation, covered_virtually, covered_inperson, status } = req.body;
        var datas;
        datas = { name_state,abbreviation, covered_virtually, covered_inperson, status }
        let states = await States.create(datas);
        const state_id = states.previous('state_id')
        res.json({
            msg: "Created",
            "id": state_id
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}


export const updateStates = async (req: Request, res: Response) => {
    try {
        const id: any = req.params.id;
        const { name_state, abbreviation, covered_virtually, covered_inperson, status  } = req.body;
        var datas;
        datas = { name_state, abbreviation, covered_virtually, covered_inperson, status  }
        const states: any = await States.findByPk(id)
        states.update(datas)
        res.json({
            msg: "States updated"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }

}

export const deleteStates = async (req: Request, res:Response) => {
    const id:any=req.params.id;
    try {
        const states = await States.findOne({where: {state_id: id} })
        if (!states) {
            return res.status(400).json({
             msg: "state doesn't exist"
          })
        }
        States.destroy({where: {state_id: id}});
        res.json({
            msg: "Deleted"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Something wrong"+error 
        })
    }
}
