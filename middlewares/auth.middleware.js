import jwt from 'jsonwebtoken'
import 'dotenv/config'
/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').NextFunction} next 
 * @param {import('express').Response} res 
 * @returns 
 */

export const authMiddleWare = async (req,res,next) =>{

    try {
        const tokenHeader = req.headers['authorization']

        if (!tokenHeader) {
            next()
        }
        if (!tokenHeader.startsWith('Bearer')) {
            return res.status(400).json({Error:"failed"})
        }

        const token = tokenHeader.split(' ')[1]

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        next()
    }
}


export const ensureAuthenticated = async(req,res,next)=>{

    if (!req.user) {
        res.status(401).json({message: 'who are you'})
    }
    next()
}