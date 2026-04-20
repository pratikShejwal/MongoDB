import mongoose from 'mongoose'

export const connectMongoDB = async(URL)=>{
   const conn = await mongoose.connect(URL)
   return conn
}


