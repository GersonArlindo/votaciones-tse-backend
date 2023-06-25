import express from 'express';
import cors from "cors";
import db from './../db/connection.db';

import indexRoutes from "./../routes/index.routes";
import languageRoutes from "./../routes/language.routes";
import personaNaturalesRoutes from "./../routes/persona_natural.routes";
import modulesRoutes from "./../routes/modules.routes";
import permissionRoutes from "./../routes/permission.routes";
import userRoutes from "./../routes/user.routes";
import partidosPoliticosRoutes from "./../routes/partidos_politicos.routes";
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
        modules: '/module',
        permission: '/permission',
        user: '/user',
        partidosPoliticos: '/partidos_politicos',
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
        this.app.use(this.apiPaths.modules, modulesRoutes);
        this.app.use(this.apiPaths.permission, permissionRoutes);
        this.app.use(this.apiPaths.user, userRoutes);
        this.app.use(this.apiPaths.partidosPoliticos, partidosPoliticosRoutes);
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
