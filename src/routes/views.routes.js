import { Router } from "express";
import { renderAboutPage, renderHomePage } from "../controllers/views.controller.js";


const router = Router();

router.get('/', renderHomePage)
router.get('/about', renderAboutPage)

export default router