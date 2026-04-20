import express from 'express'
import {connectMongoDB} from './connection.js'
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 8000

connectMongoDB(process.env.MONGODB_URL).then(()=>{
    console.log('MongoDB Connected');
})

app.listen (PORT,()=>{
    console.log('running');
    
})