import { MusicController } from "../controllers/MusicController";
import { Router } from "express";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import { uploadMiddleware } from "../middlewares/uploadMiddleware";

const musicController = new MusicController()
const router = Router()

router.get('/getAll', AuthMiddleware, musicController.getAllMusics)
router.get('/getMusic/:id', AuthMiddleware, musicController.getMusicById)
router.post('/createNewMusic',  AuthMiddleware, 
                                uploadMiddleware('covers', 'album_photo'),
                                uploadMiddleware('tracks', 'audio_track'), musicController.createNewMusic)

export default router;