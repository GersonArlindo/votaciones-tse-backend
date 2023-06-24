import dotenv from "dotenv";
import Server from "./src/models/server";

// conf variables de entorno
dotenv.config();

const server= new Server();

server.listen();