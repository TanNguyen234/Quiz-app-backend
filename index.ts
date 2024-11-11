import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv'

const app: Express = express();
const port: Number | String = process.env.PORT || 3001;

app.use(cors())
dotenv.config()

app.get('/one', (req: Request, res: Response) => {
    res.json({
        message: 'This is the first endpoint'
    })
});

app.listen(port, () => { 
    console.log(`Express server listening on port ${port}`)
});