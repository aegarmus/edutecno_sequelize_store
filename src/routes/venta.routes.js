import { Router } from "express";
import { createVentaConProducto, getAllSalesWithDetails, getSaleByUserId } from "../controllers/venta.controller.js";

const router = Router();

router.post('/', createVentaConProducto);
router.get('/', getAllSalesWithDetails);
router.get('/usuario/:usuarioId', getSaleByUserId);

export default router