import { MusicController } from "../controllers/MusicController";
import { Router } from "express";
import { AuthMiddleware } from "../middlewares/authMiddleware";

const musicController = new MusicController()
const router = Router()

router.get('/getAll', AuthMiddleware, musicController.getAllMusics)
router.get('/getMusic/:id', AuthMiddleware, musicController.getMusicById)
router.post('/createNewMusic', AuthMiddleware, musicController.createNewMusic)

export default router;