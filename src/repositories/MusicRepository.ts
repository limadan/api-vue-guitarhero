import { Music } from '../models/Music'
import db from '../firebase/firestore'

interface CreateMusicDTO{
    artist: string
    title: string
    audio_url: string
}

export class MusicRepository{
    public async getAll(): Promise<Music[]>{
        const musicRef = await db.musics.get()
        const musics = musicRef.docs.map((doc)=>{
            let music: Music = {id: doc.id, ...doc.data()} as Music
            return music
        })

        return musics
    }

    public async getById(id: string):Promise<Music|undefined>{
        const musicRef = await db.musics.doc(id).get()
        if(!musicRef.exists){
            return undefined
        }

        const music = {id: musicRef.id, ...musicRef.data()} as Music
        return music
    }

    public async save(data: CreateMusicDTO): Promise<Music|undefined>{
        const result = await db.musics.add(data)
        if(!result.id){
            return undefined
        }
        
        const music = {id: result.id, ...data} 
        return music as Music
    }

    public async edit(){

    }
}