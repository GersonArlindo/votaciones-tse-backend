import { Request, Response } from "express";
import SalesRep from "./../models/sales_rep";
import States from "../models/states";
import User from "../models/users";
import Language from "../models/lenguage";

//relacion entre sale_rep y user
SalesRep.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(SalesRep, { foreignKey: "user_id" });

//relacion entre sale_rep y state
SalesRep.belongsTo(States, { foreignKey: "state_id" });
States.hasMany(SalesRep, { foreignKey: "state_id" });

//relacion entre user y language
User.belongsTo(Language, { foreignKey: "language_id" });
Language.hasMany(User, { foreignKey: "language_id" });

export const getSalesRep = async (req: Request, res: Response) => {
  try {
    const salesRep = await SalesRep.findAll({
      include: [
        {
          model: User,
          attributes: [
            "user_id",
            "first_name",
            "last_name",
            "username",
            "user_images",
            "email",
            "phone_number",
          ],
          include: [
            {
              model: Language,
              attributes: ["language_id", "language_name"],
            },
          ],
        },
        {
          model: States,
          attributes: [
            "state_id",
            "name_state",
            "covered_virtually",
            "covered_inperson",
            "status",
          ],
        },
      ],

      order: [["sales_rep_id", "DESC"]],
    });
    res.json({
      salesRep,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error: " + error,
    });
  }
};

export const getSalesRepById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const salesRep = await SalesRep.findOne({
      include: [
        {
          model: User,
          attributes: [
            "user_id",
            "first_name",
            "last_name",
            "username",
            "user_images",
            "email",
            "phone_number",
          ],
          include: [
            {
              model: Language,
              attributes: ["language_id", "language_name"],
            },
          ],
        },
        {
          model: States,
          attributes: [
            "state_id",
            "name_state",
            "covered_virtually",
            "covered_inperson",
            "status",
          ],
        },
      ],

      where: { sales_rep_id: id },
    });

    if (!salesRep) {
      return res.status(400).json({
        msg: "sales rep doesn't exist",
      });
    } else {
      return res.json({
        salesRep,
      });
    }
  } catch (error) {
    res.json({
      Msg: "Error: " + error,
    });
  }
};

export const createSalesRep = async (req: Request, res: Response) => {
  try {
    const {
      user_id,
      state_id,
      appointment_type_availability,
      appt_status,
      color_appt,
      created_by,
    } = req.body;
    var datas;
    datas = {
      user_id,
      state_id,
      appointment_type_availability,
      appt_status,
      color_appt,
      created_by,
    };
    let salesRep = await SalesRep.create(datas);
    const sales_rep_id = salesRep.previous("sales_rep_id");
    res.json({
      msg: "Created",
      id: sales_rep_id,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error: " + error,
    });
  }
};

export const updateSalesRep = async (req: Request, res: Response) => {
  try {
    const id: any = req.params.id;
    const {
      user_id,
      state_id,
      appointment_type_availability,
      appt_status,
      color_appt,
      created_by,
    } = req.body;
    var datas;
    datas = {
      user_id,
      state_id,
      appointment_type_availability,
      appt_status,
      color_appt,
      created_by,
    };
    const salesRep: any = await SalesRep.findByPk(id);
    salesRep.update(datas);
    res.json({
      msg: "Sales Red updated",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error: " + error,
    });
  }
};

export const deleteSalesRep = async (req: Request, res: Response) => {
  const id: any = req.params.id;
  try {
    const salesRep = await SalesRep.findOne({ where: { sales_rep_id: id } });
    if (!salesRep) {
      return res.status(400).json({
        msg: "Sales Rep doesn't exist",
      });
    }
    SalesRep.destroy({ where: { sales_rep_id: id } });
    res.json({
      msg: "Deleted",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Something wrong" + error,
    });
  }
};
