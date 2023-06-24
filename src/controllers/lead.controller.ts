import { Request, Response } from 'express'
import Lead from './../models/leads'
import { convert } from '../middlewares/uploadCSV';
import csv from 'csv';
import fs from 'fs';
import db from '../db/connection.db';

const { google } = require('googleapis');
const { JWT } = require('google-auth-library');
const credentials = require('./../../google-cloud-key.json');
const scopes = ['https://www.googleapis.com/auth/spreadsheets'];

const auth = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes,
});

const sheets = google.sheets({ version: 'v4', auth });
const sheetId = '1waRJGgT8kmTspab6_bx0gbXJ2Rr0VjW-NB8w5MoXVi8';
const range = 'Leads!2:1000';

export const getLeadBySheet = async (req: Request, res: Response) => {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: range,
        });
          
        const rows = response.data.values;

        rows.forEach( async (row: any) => {
            const leadPk = await Lead.findOne({ where: { lead_id: row[1] } })

            if(leadPk) {
                
            }else{
                await Lead.create({
                    lead_id: row[1],
                    first_name: row[2], 
                    last_name: row[3], 
                    phone_number: row[4], 
                    email: row[5], 
                    st_address: row[6], 
                    city: row[7], 
                    state: row[8], 
                    zip_code: row[9], 
                    full_address: row[10], 
                    source: row[11], 
                    campaign_name: row[12], 
                    ad_set_name: row[13], 
                    ad_name: row[14], 
                    ad_account_id: row[15], 
                    agent_assigned: row[16], 
                    outcome: row[17], 
                    tags: row[18], 
                    notes: row[19],
                    home_owner: row[20],
                    bill_amount: row[21],
                    date_create: row[22],  
                    date_modify: row[23],  
                    modification_by: row[24]
                });

            }
            
        });

        res.json({
            msg: "Table updated",
        })
        
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}

export const getLead = async (req: Request, res: Response) => {
    try {
        const lead = await Lead.findAll();
        res.json({
            lead: lead.reverse()
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}

export const getLeadById = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const lead = await Lead.findOne({ where: { lead_id: id } })
        //const lead = await db.query(`SELECT * FROM tbl_leads WHERE lead_id = ${id} LIMIT 1`)
        console.log(lead)
        if (!lead) {
            return res.status(400).json({
             msg: "lead doesn't exist"
          })
        }else{
            return res.json({
                lead
            })
        }
    } catch (error) {
        res.json({
            Msg: "Error: " + error
        })
    }
}


export const uploadLeadCSV = async (req: Request, res: Response) => {
    try {
        if (!req.files || !req.files.file) {
            res.status(404)
              .send('File not found');
        } else if (req.files) {
            let csvFile = req.files.file;
            res.send(csvFile);

            var parser = csv.parse({
                delimiter: ',',
                columns: true
            })
        
        
        } else {
            res.json({
                msg: 'File format is not valid',
            })
        }
        /* res.json({
            msg: "Created",
        }) */
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}

export const createLead = async (req: Request, res: Response) => {
    try {
        const { id_l, first_name, last_name, phone_number, email, st_address, city, state, zip_code, full_address, source, campaign_name, ad_set_name, ad_name, ad_account_id, agent_assigned, outcome, tags, notes, date_create, date_modify, modification_by, status_lead} = req.body;
        var datas;
        datas = { id_l, first_name, last_name, phone_number, email, st_address, city, state, zip_code, full_address, source, campaign_name, ad_set_name, ad_name, ad_account_id, agent_assigned, outcome, tags, notes, date_create, date_modify, modification_by, status_lead}
        let lead = await Lead.create(datas);
        const lead_id = lead.previous('lead_id')
        res.json({
            msg: "Created",
            "id": lead_id
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}

export const updateLead = async (req: Request, res: Response) => {
    try {
        const id: any = req.params.id;
        const { id_l, first_name, last_name, phone_number, email, st_address, city, state, zip_code, full_address, source, campaign_name, ad_set_name, ad_name, ad_account_id, agent_assigned, outcome, tags, notes, date_create, date_modify, modification_by, status_lead} = req.body;
        var datas;
        datas = { id_l, first_name, last_name, phone_number, email, st_address, city, state, zip_code, full_address, source, campaign_name, ad_set_name, ad_name, ad_account_id, agent_assigned, outcome, tags, notes, date_create, date_modify, modification_by, status_lead }
        const lead: any = await Lead.findByPk(id)
        lead.update(datas)
        res.json({
            msg: "Lead updated"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}

export const deleteLead = async (req: Request, res:Response) => {
    const id:any=req.params.id;
    try {
        const lead = await Lead.findOne({where: {lead_id: id} })
        if (!lead) {
            return res.status(400).json({
             msg: "lead doesn't exist"
          })
        }
        Lead.destroy({where: {per_id: id}});
        res.json({
            msg: "Deleted"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Something wrong"+error 
        })
    }
}
