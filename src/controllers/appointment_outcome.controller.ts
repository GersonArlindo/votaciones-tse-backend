import { Request, Response } from 'express'
import AppointmentOutcome from './../models/appointment_outcome'

export const getAppointmentOutcome = async (req: Request, res: Response) => {
    try {
        const appointmentOutcome = await AppointmentOutcome.findAll({ order: [['apptm_outcome_id', 'DESC'],] });
        res.json({
            appointmentOutcome
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}

export const getAppointmentOutcomeById = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const appointment_outcome = await AppointmentOutcome.findOne({ where: { apptm_outcome_id: id } })
        if (!appointment_outcome) {
            return res.status(400).json({
             msg: "Appointment Outcome doesn't exist"
          })
        }else{
            return res.json({
                appointment_outcome
            })
        }
    } catch (error) {
        res.json({
            Msg: "Error: " + error
        })
    }
}

export const createAppointmentOutcome = async (req: Request, res: Response) => {
    try {
        const { apptm_outcome_name } = req.body;
        var datas;
        datas = { apptm_outcome_name }
        let appointment_outcome = await AppointmentOutcome.create(datas);
        const apptm_id = appointment_outcome.previous('apptm_id')
        res.json({
            msg: "Created",
            "id": apptm_id
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}


export const updateAppointmentOutcome = async (req: Request, res: Response) => {
    try {
        const id: any = req.params.id;
        const { apptm_outcome_name } = req.body;
        var datas;
        datas = { apptm_outcome_name }
        const appointment_outcome: any = await AppointmentOutcome.findByPk(id)
        appointment_outcome.update(datas)
        res.json({
            msg: "Appointment Outcome updated"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }

}

export const deleteAppointmentOutcome = async (req: Request, res:Response) => {
    const id:any=req.params.id;
    try {
        const appointment_outcome = await AppointmentOutcome.findOne({where: {apptm_outcome_id:id} })
        if (!appointment_outcome) {
            return res.status(400).json({
             msg: "AppointmentOutcome doesn't exist"
          })
        }
        AppointmentOutcome.destroy({where: {apptm_outcome_id: id}});
        res.json({
            msg: "Deleted"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Something wrong"+error 
        })
    }
}
