import express, {Request, Response} from 'express'
import musicRouter from './routes/musicRoutes'

const app = express()
app.use(express.json())

app.use('/music', musicRouter)

app.listen(3000, ()=>{
    console.log("Servidor rodando! Porta: 3000")
})