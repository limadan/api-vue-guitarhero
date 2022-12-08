import { MusicController } from "../controllers/MusicController";
import { Router } from "express";

const musicController = new MusicController()
const router = Router()

router.get('/getAll', musicController.getAllMusics)
router.get('/getMusic/:id', musicController.getMusicById)
router.post('/createNewMusic', musicController.createNewMusic)

export default router;