import express from 'express';
import cors from "cors";
import db from './../db/connection.db';

import indexRoutes from "./../routes/index.routes";
import languageRoutes from "./../routes/language.routes";
import personaNaturalesRoutes from "./../routes/persona_natural.routes";
import password_masterRoutes from "./../routes/password_master.routes";
import timezoneRoutes from "./../routes/timezone.routes";
import disqualificationRoutes from "./../routes/disqualification.routes";
import energyProviderRoutes from "./../routes/energy_provider.routes";
import roofRoutes from "./../routes/roof.routes";
import sales_repRoutes from "./../routes/sales_rep.routes";
import appointment_outcomeRoutes from "./../routes/appointment_outcome.routes";
import modulesRoutes from "./../routes/modules.routes";
import permissionRoutes from "./../routes/permission.routes";
import userRoutes from "./../routes/user.routes";
import partidosPoliticosRoutes from "./../routes/partidos_politicos.routes";
import providerRoutes from "./../routes/provider.routes";
import installersRoutes from "./../routes/installer.routes";
import stateRoutes from "./../routes/state.routes";
import assign_appointmentRoutes from "./../routes/assign_appointment.routes";
import leadRoutes from "./../routes/lead.routes";
import roleRoutes from '../routes/role.routes';
import authPermission from "./../routes/auth.routes"
import uploadImagesPermission from "./../routes/upload_images.routes"
import uploadDocumentsPermission from "./../routes/upload_documents.routes"
import uploadAudioPermission from "./../routes/upload_audio.routes"
import fileUpload from "express-fileupload";

class Server {

    private app: express.Application;
    private port: any;
    private apiPaths = {
        index: '/',
        language: '/language',
        persona_natural: '/persona-natural',
        password_master: '/password_master',
        timezone: '/timezone',
        disqualification: '/disqualification',
        energyProvider: '/energy_provider',
        roof: '/roof',
        sales_rep: '/sales_rep',
        appointment_outcome:'/appointment_outcome',
        modules: '/module',
        permission: '/permission',
        user: '/user',
        partidosPoliticos: '/partidos_politicos',
        provider: '/provider',
        installers: '/installers',
        state: '/state',
        assign_appointment: '/assign_appointment',
        lead: '/lead',
        role: '/role',
        auth: '/auth',
        upload_images: '/upload-images',
        upload_document: '/upload-document',
        upload_audio: '/upload-audio'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.middlewars();
        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();
        } catch (error) {
            throw new Error("Tu error es: " + error);

        }
    }

    middlewars() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.set('view engine', 'pug');
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            limits: { fileSize: 50 * 1024 * 1024 },
        }));
     }
    
    routes() {
        this.app.use(this.apiPaths.index, indexRoutes);
        this.app.use(this.apiPaths.language, languageRoutes);
        this.app.use(this.apiPaths.persona_natural, personaNaturalesRoutes);
        this.app.use(this.apiPaths.password_master, password_masterRoutes);
        this.app.use(this.apiPaths.timezone, timezoneRoutes);
        this.app.use(this.apiPaths.disqualification, disqualificationRoutes);
        this.app.use(this.apiPaths.energyProvider, energyProviderRoutes);
        this.app.use(this.apiPaths.roof, roofRoutes);
        this.app.use(this.apiPaths.sales_rep, sales_repRoutes);
        this.app.use(this.apiPaths.appointment_outcome, appointment_outcomeRoutes);
        this.app.use(this.apiPaths.modules, modulesRoutes);
        this.app.use(this.apiPaths.permission, permissionRoutes);
        this.app.use(this.apiPaths.user, userRoutes);
        this.app.use(this.apiPaths.partidosPoliticos, partidosPoliticosRoutes);
        this.app.use(this.apiPaths.provider, providerRoutes);
        this.app.use(this.apiPaths.installers, installersRoutes);
        this.app.use(this.apiPaths.state, stateRoutes);
        this.app.use(this.apiPaths.assign_appointment, assign_appointmentRoutes);
        this.app.use(this.apiPaths.lead, leadRoutes);
        this.app.use(this.apiPaths.role, roleRoutes);
        this.app.use(this.apiPaths.auth, authPermission);
        this.app.use(this.apiPaths.upload_images, uploadImagesPermission)
        this.app.use(this.apiPaths.upload_document, uploadDocumentsPermission)
        this.app.use(this.apiPaths.upload_audio, uploadAudioPermission)
    }

    listen() {
        this.app.listen(
            this.port, () => {
                console.log("Server corriendo en ", this.port);
            }
        );
    }
}
export default Server;
