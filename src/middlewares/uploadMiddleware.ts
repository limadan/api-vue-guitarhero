import { Request, Response, NextFunction } from "express";
import bucket from "../firebase/storage";
import fs from 'fs'

export const uploadMiddleware = (cloudPath: string, fieldname: string)=>{
    return async (req: Request, res: Response, next: NextFunction)=>{
        
        if(!req.files){
            return next();
        }
        const fileRef = JSON.parse(JSON.stringify(req.files[fieldname]))
        const file = fs.readFileSync(fileRef.tempFilePath)
        
        await bucket.file(`${cloudPath}/${JSON.stringify(Date.now())}`).save(
            file, {
                gzip: true,
                metadata: {
                    contentType: fileRef.mimetype
                }
            })
        const url = (await bucket.file(`${cloudPath}/${JSON.stringify(Date.now())}`).getSignedUrl({
            action: 'read',
            expires: '03-09-2491'
        }))[0]

        return next()
    }
}