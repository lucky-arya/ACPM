import { Router } from "express"

import { ApiResponse } from "../utils/ApiResponse.js"
import { homeRouteHandler, sendContactMessage } from "../controllers/home.controller.js"



const router = Router()

router.get("/",homeRouteHandler)
router.post("/api/v1/contact", sendContactMessage)

export default router