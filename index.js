import express from 'express'
import {connectMongoDB} from './connection.js'
import 'dotenv/config'
import userRouter from './routes/user.routes.js'

const app = express()
const PORT = process.env.PORT || 8000
app.use(express.json())

connectMongoDB(process.env.MONGODB_URL).then(()=>{
    console.log('MongoDB Connected');
})

app.use('/user',userRouter)

app.listen (PORT,()=>{
    console.log('running');
    
})