import { Router } from "express";
import { createVentaConProducto } from "../controllers/venta.controller.js";

const router = Router();

router.post('/', createVentaConProducto);

export default router