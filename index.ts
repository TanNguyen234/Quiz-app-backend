import express, {Express, request, Request} from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import userApiRoute from './api/v1/userApi/routes/index.route';
import * as database from './config/database.config'
import http from 'http'
import { Server } from 'socket.io';

declare global {
    namespace NodeJS {
      interface Global {
        _io?: Server;
      }
    }
  }

dotenv.config()

const app: Express = express();
const port: Number | String = process.env.PORT || 3002;

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//SocketIO
const pathFrontend = 'http://localhost:3000'
const server: any = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: pathFrontend, // Domain frontend
      methods: ["GET", "POST"],
    },
  });
(global as any)._io = io;
//End Socket

//Kết nối database
database.connect()

userApiRoute(app)

server.listen(port, () => { 
    console.log(`Express server listening on port ${port}`)
});