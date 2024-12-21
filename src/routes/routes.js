import { Router } from "express";
import userRouter from './usuario.routes.js'
import productRouter from './producto.routes.js'
import orderRouter from './venta.routes.js'



const router = Router()

router.use('/usuario', userRouter);
router.use('/producto', productRouter);
router.use('/venta', orderRouter);

export default router