import { MusicRepository } from "../repositories/MusicRepository";
import bucket from "../firebase/storage";
import { Request, Response } from "express";
import fs from 'fs'
import uploadStorage from "../helpers/uploadStorage";

export class MusicController{

    public async getAllMusics(req: Request, res: Response):Promise<Response>{
        const musicRepository = new MusicRepository();        
        const musics = await musicRepository.getAll();
        return res.status(200).json(musics)
    }

    public async getMusicById(req: Request, res: Response):Promise<Response>{
        const musicRepository = new MusicRepository();
        const music = await musicRepository.getById(req.params.id);
        
        if(!music){
            return res.status(404).json({
                error: `Não existem músicas com a ID ${req.params.id}`
            })
        }
        return res.status(200).json(music)
        
    }

    public async createNewMusic(req: Request, res: Response): Promise<any>{
        const fileObject = JSON.parse(JSON.stringify(req.files))
        const tempFilePathPhoto = fileObject.album_photo.tempFilePath
        const tempFilePathAudio = fileObject.album_photo.tempFilePath

        Promise.all([
            uploadStorage(tempFilePathPhoto, 'covers'),
            uploadStorage(tempFilePathAudio, 'tracks')
        ]).then((resolve)=>{
            fs.rmSync(tempFilePathAudio, { recursive: true, force: true })
            fs.rmSync(tempFilePathPhoto, { recursive: true, force: true })

            const musicRepository = new MusicRepository();
            const new_music = {
                artist: req.body.artist,
                title: req.body.title,
                album_photo: resolve[0][0],
                audio_url: resolve[1][0]
            }
            const result = musicRepository.save(new_music)

            if(!result){
                return res.status(500).json({
                    error: "Ocorreu algum erro ao salvar no banco de dados"
                })
            }

            return res.status(200).json(new_music)
        }).catch(()=>{
            return res.status(500).json({
                error: "Ocorreu um erro ao fazer o upload de arquivo"
            })
        })
    }
}