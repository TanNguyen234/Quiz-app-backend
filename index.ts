import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import userApiRoute from './api/v1/userApi/routes/index.route';
import * as database from './config/database.config'

dotenv.config()

const app: Express = express();
const port: Number | String = process.env.PORT || 3002;

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//Kết nối database
database.connect()

userApiRoute(app)

app.listen(port, () => { 
    console.log(`Express server listening on port ${port}`)
});