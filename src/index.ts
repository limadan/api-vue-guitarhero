import express, {Request, Response} from 'express'
import musicRouter from './routes/musicRoutes'
import fileUpload from 'express-fileupload'

const app = express()

app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    debug: true,
    limits: { fileSize: 50 * 1024 * 1024 },
  }));
app.use('/music', musicRouter)

app.listen(3000, ()=>{
    console.log("Servidor rodando! Porta: 3000")
})