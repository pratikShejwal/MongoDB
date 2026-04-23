import express from 'express'
import {User} from '../models/user.model.js'
import {randomBytes, createHmac} from 'node:crypto'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/signup',async(req,res)=>{
    const {name,email,password} = req.body

    const existUser = await User.findOne({
        email,
    })
    if (existUser) {
        return res.status(404).json({Error : 'User Found'})
    }

    const salt = randomBytes(256).toString('hex')
    const hashedPassword = createHmac('sha256',salt)
    .update(password).digest('hex')

    const user = await User.insertOne({
        name,
        email,
        password:hashedPassword,
        salt
    })

    return res.status(201).json({MEssage:'User cReated', id: user._id})
    
})

router.post('/login', async(req,res)=>{
    const {email,password} = req.body
    const existUser = await User.findOne({
        email,
    })

    if (!existUser) {
        res.status(404).json({Error: "User not found"})
    }

    const esalt = existUser.salt
    const hashedPassword = existUser.password

     const newHash = createHmac('sha256',esalt)
    .update(password).digest('hex')

    if (hashedPassword !== newHash) {
        res.status(404).json({Error:"failed"})
    }

    const payload = {
        _id: existUser._id,
        name: existUser.name,
        email: existUser.email
    }

    const token  =  jwt.sign(payload,process.env.JWT_SECRET)

    return res.status(200).json({
        message: "successful", token
    })

})


export default router