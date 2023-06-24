import bcryp from 'bcryptjs';
import { Request, Response } from 'express'
import User from './../models/users'
import { v4 as uuidv4 } from 'uuid';
import Language from '../models/lenguage';
import Role from '../models/role';
import fs from 'fs';
import { uploadFile } from '../middlewares/uploadToS3';
import util from "util";
const Path = require('path')  

const unlinkFile = util.promisify(fs.unlink);

//relacion entre users y language
User.belongsTo(Language, { foreignKey: "language_id" })
Language.hasMany(User, { foreignKey: "language_id" })

//relacion entre users y rols
User.belongsTo(Role, { foreignKey: "rol_id" })
Role.hasMany(User, { foreignKey: "rol_id" })

const salt = bcryp.genSaltSync();

export const getUser = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll({ include: [{
            model: Language,
            attributes: ["language_id", "language_name"]
          }, {
            model: Role,
            attributes: ["rol_id", "rol_rol", "rol_descripcion"]
          }],
          
          order: [['user_id', 'DESC'],] 
          
        });
        res.json({
            users
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const user = await User.findOne({ include: [{
            model: Language,
            attributes: ["language_id", "language_name"]
          }, {
            model: Role,
            attributes: ["rol_id", "rol_rol", "rol_descripcion"],
          }],
        
        where: { user_id: id } })

        if (!user) {
            return res.status(400).json({
             msg: "user doesn't exist"
          })
        }else{
            return res.json({
                user
            })
        }
    } catch (error) {
        res.json({
            Msg: "Error: " + error
        })
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { first_name, last_name, birthdate, username, email, password, phone_number, language_id, rol_id, status } = req.body;

        const Newpassword = bcryp.hashSync(password, salt);
        const existeEmail= await User.findOne( { where:{ email: email } } );
        const existeUsername = await User.findOne( { where:{ username: username } } );

        if (existeEmail) {
            return res.status(400).json({
                msg: "Ya existe este email"
            });
        }if (existeUsername) {
            return res.status(400).json({
                msg: "Ya existe ese username"
            });
        }else{
            var datas;
            if(!req.files){
                const lenguage = await Language.findByPk(language_id)
                const role = await Role.findByPk(rol_id)

                if(!lenguage){
                    return res.json({
                        msg: "This lenguage not exist"
                    })
                }if(!role){
                    return res.json({
                        msg: "This Role not exist"
                    })
                }else{
                    datas = { first_name, last_name, username, user_images: `https://ez-marketing-images.s3.us-west-2.amazonaws.com/muestra.png`, email, password: Newpassword, phone_number, language_id, rol_id, status }
                    let user = await User.create(datas);
                    const user_id = user.previous('user_id');
                    
                    res.json({
                        msg: "Created",
                        "id": user_id
                    })
                }
            }else{
                const { user_images }: any = req.files;

                const lenguage = await Language.findByPk(language_id)
                const role = await Role.findByPk(rol_id)

                if(!lenguage){
                    return res.json({
                        msg: "This lenguage not exist"
                    })
                }if(!role){
                    return res.json({
                        msg: "This Role not exist"
                    })
                }else{
                    const extencion = user_images.name.split('.').pop();
                    const nameUnic = uuidv4() + "." + extencion;

                    if (extencion == "pdf") {
                        return res.status(400).json({ msg: "Please upload a valid image!" });
                    }if (extencion == "doc") {
                        return res.status(400).json({ msg: "Please upload a valid image!" });
                    }if (extencion == "xlsx") {
                        return res.status(400).json({ msg: "Please upload a valid image!" });
                    }if (extencion == "jfif"){
                        return res.status(400).json({ msg: "Please upload a valid image!" });
                    }

                    const result = await uploadFile(user_images.tempFilePath, "users/", nameUnic, `${user_images.mimetype}`);  // Calling above function in s3.js
                    
                    await unlinkFile(user_images.tempFilePath);
                    
                    const publicImg = `https://ez-marketing-bucket.s3.us-east-2.amazonaws.com/${nameUnic}`;

                    datas = { first_name, last_name, birthdate, username, user_images: publicImg, email, password: Newpassword, phone_number, language_id, rol_id, status }

                    // inserta los datos en la base
                    const users = await User.create(datas);
                    const id_user = users.previous('user_id')

                    res.json({
                        msg: "Created",
                        "id": id_user
                    })
                }
            } 
        }

    } catch (error) {
        return res.status(500).json({
            msg: "Error: " + error
        })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const id: any = req.params.id;
        const { first_name, last_name, birthdate, username, email, phone_number, language_id, rol_id, status } = req.body;

        var datas;
        if(!req.files){
            datas = { first_name, last_name, birthdate, username, email, phone_number, language_id, rol_id, status }

            // inserta los datos en la base
            const user: any = await User.findByPk(id)
            user.update(datas)
            res.json({
                msg: "User updated"
            })
        }else{
            const { user_images }: any = req.files;

            const extencion = user_images.name.split('.').pop();
            const nameUnic = uuidv4() + "." + extencion;

            if (extencion == "pdf") {
                return res.status(400).json({ msg: "Please upload a valid image!" });
            }if (extencion == "doc") {
                return res.status(400).json({ msg: "Please upload a valid image!" });
            }if (extencion == "xlsx") {
                return res.status(400).json({ msg: "Please upload a valid image!" });
            }if (extencion == "jfif"){
                return res.status(400).json({ msg: "Please upload a valid image!" });
            }

            const result = await uploadFile(user_images.tempFilePath, "users/", nameUnic, `${user_images.mimetype}`);  // Calling above function in s3.js
                    
            await unlinkFile(user_images.tempFilePath);

            const publicImg = `https://ez-marketing-bucket.s3.us-east-2.amazonaws.com/${nameUnic}`;

            datas = { first_name, last_name, birthdate, username, user_images: publicImg, email, phone_number, language_id, rol_id, status }

            // inserta los datos en la base
            const user: any = await User.findByPk(id)
            user.update(datas)
            res.json({
                msg: "User updated"
            })
        } 

    } catch (error) {
        res.status(500).json({
            msg: "Error: " + error
        })
    }

}

export const deleteUser = async (req: Request, res:Response) => {
    const id:any=req.params.id;
    try {
        const user = await User.findOne({where: {user_id: id} })
        if (!user) {
            return res.status(400).json({
             msg: "user doesn't exist"
          })
        }
        User.destroy({where: {user_id: id}});
        res.json({
            msg: "Deleted"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Something wrong"+error 
        })
    }
}
