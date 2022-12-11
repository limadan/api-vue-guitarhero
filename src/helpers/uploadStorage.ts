import bucket from "../firebase/storage";
import fs from 'fs'

export default async function uploadStorage(localPath: string, cloudPath: string):Promise<Array<any>|any>{
    const file = fs.readFileSync(localPath)
    const fileInfo = fs.statSync(localPath)
    await bucket.file(`${cloudPath}/${fileInfo.birthtime}`)
            .save(Buffer.from(file), {
                gzip: true
    }).then(()=>{
        return bucket.file(cloudPath)
        .getSignedUrl({
            action: 'read',
            expires: '03-09-2491'
        })
    })
    
}