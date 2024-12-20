import { Producto } from "../models/Producto.model.js"



export const createProduct = async(req, res, next) => {
    try {
        const product = await Producto.create(req.body)

        res.status(201).json({
            message: 'Producto creado con éxito',
            status: 201,
            data: product
        });
    } catch (error) {
        next(error);
    }
}