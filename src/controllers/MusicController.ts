import { MusicRepository } from "../repositories/MusicRepository";
import { Request, Response } from "express";



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

    public async createNewMusic(req: Request, res: Response): Promise<Response>{
        const musicRepository = new MusicRepository();
        const new_music = {
            artist: req.body.artist,
            title: req.body.title,
            album_photo: req.body.album_photo,
            audio_url: req.body.audio_url
        }
        const result = await musicRepository.save(new_music)

        if(!result){
            return res.status(500).json({
                error: "Ocorreu algum erro ao salvar no banco de dados"
            })
        }

        return res.status(200).json(new_music)
    }
}