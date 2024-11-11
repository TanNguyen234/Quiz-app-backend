import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import userApiRoute from './api/v1/userApi/routes/index.route';
import * as database from './config/database.config'

const app: Express = express();
const port: Number | String = process.env.PORT || 3001;

app.use(cors())
dotenv.config()

database.connect()

userApiRoute(app)

app.listen(port, () => { 
    console.log(`Express server listening on port ${port}`)
});