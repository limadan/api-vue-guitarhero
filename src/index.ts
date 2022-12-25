import express, {Request, Response} from 'express'
import musicRouter from './routes/musicRoutes'
import authRouter from './routes/AuthRoutes'
import fileUpload from 'express-fileupload'
import { config } from "dotenv";

config()

const app = express()

app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    debug: true,
    limits: { fileSize: 50 * 1024 * 1024 },
  }));

app.use('/music', musicRouter)
app.use('/auth', authRouter)
app.listen(3000, ()=>{
    console.log("Servidor rodando! Porta: 3000")
})