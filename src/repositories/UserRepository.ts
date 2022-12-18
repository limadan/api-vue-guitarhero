import db from '../firebase/firestore'
import {User}  from '../models/User'

interface UserDTO{
    id?:string,
    username: string,
    password: string,
    email: string
}

export class UserRepository{
    public async getUserById(id: string): Promise<User|undefined>{
        const user = (await db.users.doc(id).get()).data()

        if(!user){
            return undefined
        }else{
            return user
        }
    }

    public async getUserByUsername(username: string): Promise<User|undefined>{
        const user = (await db.users.where('username', '==', username).get()).docs[0]

        if(!user){
            return undefined
        }else{
            return user.data()
        }
    }

    public async createUser(user: UserDTO): Promise<any>{
        await db.users.add(user)
    }
}