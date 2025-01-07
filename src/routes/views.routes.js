import { Router } from "express";
import { renderAboutPage, renderHomePage, renderListProduct } from "../controllers/views.controller.js";


const router = Router();

router.get('/', renderHomePage)
router.get('/about', renderAboutPage)
router.get('/products', renderListProduct)

export default router