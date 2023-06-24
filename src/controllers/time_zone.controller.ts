import { Request, Response } from 'express'
import TimeZone from './../models/time_zone'

export const getTimeZone = async (req: Request, res: Response) => {
    try {
        const timeZone = await TimeZone.findAll({ order: [['time_zone_id', 'DESC'],] });
        res.json({
            timeZone
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}

export const getTimeZoneById = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const timeZone = await TimeZone.findOne({ where: { time_zone_id: id } })
        if (!timeZone) {
            return res.status(400).json({
             msg: "timeZone doesn't exist"
          })
        }else{
            return res.json({
                timeZone
            })
        }
    } catch (error) {
        res.json({
            Msg: "Error: " + error
        })
    }
}

export const createTimeZone = async (req: Request, res: Response) => {
    try {
        const { time_zone_name } = req.body;
        var datas;
        datas = { time_zone_name }
        let timeZone = await TimeZone.create(datas);
        const time_zone_id = timeZone.previous('time_zone_id')
        res.json({
            msg: "Created",
            "id": time_zone_id
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}


export const updateTimeZone = async (req: Request, res: Response) => {
    try {
        const id: any = req.params.id;
        const { time_zone_name } = req.body;
        var datas;
        datas = { time_zone_name }
        const timeZone: any = await TimeZone.findByPk(id)
        timeZone.update(datas)
        res.json({
            msg: "TimeZone updated"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }

}

export const deleteTimeZone = async (req: Request, res:Response) => {
    const id:any=req.params.id;
    try {
        const timeZone = await TimeZone.findOne({where: {time_zone_id:id} })
        if (!timeZone) {
            return res.status(400).json({
             msg: "timeZone doesn't exist"
          })
        }
        TimeZone.destroy({where: {time_zone_id: id}});
        res.json({
            msg: "Deleted"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Something wrong"+error 
        })
    }
}
