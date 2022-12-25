import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Token {
    user_id: string
}

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) =>{
    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(401).json({error: 'Token não enviado!'})
    }

    const token = authHeader.split(" ")[1]

    try{
        const decoded = verify(token, JSON.stringify(process.env.SECRET)) as Token
        const userId = decoded.user_id
        req.userId = userId
        return next()
    }catch(err){
        return res.status(401).json({error: 'Token inválido ou expirado!'})
    }
}