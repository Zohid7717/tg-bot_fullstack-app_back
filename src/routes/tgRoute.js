import { Router } from "express"
import { getMessage } from "../controllers/tgRouts.js";

const router = Router()

router.get('/tgmessage', getMessage )

export default router