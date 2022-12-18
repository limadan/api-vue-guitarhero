import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { hash, compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

export class AuthController{
    public async signup(req: Request, res: Response): Promise<Response> {
        const userRepository = new UserRepository();

        const user = await userRepository.getUserByUsername(req.body.username)

        if(user){
            return res.status(404).json({error: "Usuário já existente"})
        }

        await userRepository.createUser({
            username: req.body.username,
            password: await hash(req.body.password, 10),
            email: req.body.email
        })

        return res.status(200).json(user)
        
    }

    public async login(req: Request, res: Response): Promise<Response>{
        const userRepository = new UserRepository()

        const user = await userRepository.getUserByUsername(req.body.username)

        if(!user){
            return res.status(404).json({error: "Usuário inexistente!"})
        }

        if(!await compare(req.body.password, user.password)){
            return res.status(404).json({error: "Senha incorreta"})
        }

        const token = sign({
            userId: user.id,
            expiresIn: '24h'
        }, 'mysecret')
        
        return res.status(200).json({token: token})
    }
}