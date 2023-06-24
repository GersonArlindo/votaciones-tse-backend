require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendMailGrid = async (email_destino: any, titulo: any, contenido: any) => {
    try {       
        const msg = {
            to: email_destino,
            from: "alberto-turcios@ez-marketing.us",
            subject: `Hello ${titulo}, You have a new Appointment!`,
            text: "Ez-marketing Schedule",
            html: contenido,
        }
        // console.log(msg);
        await sgMail.send(msg);
        // console.log("message send successfully");

    } catch (error) {
        console.error(error);
    }
} 