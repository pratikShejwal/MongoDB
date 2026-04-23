import express from 'express'
import {User} from '../models/user.model.js'
import {randomBytes, createHmac} from 'node:crypto'

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

export default router