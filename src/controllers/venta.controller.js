import { dbConfig } from "../config/db.config.js"
import { ValidationError } from "../errors/TypeError.js";
import { Producto } from "../models/Producto.model.js";
import { Usuario } from "../models/Usuario.model.js";
import { Venta } from "../models/Venta.model.js";
import { VentasProductos } from "../models/VentaProducto.model.js";
import { isEmptyData, isValidDate, notFoundDataRequestByPk } from "../utils/validations/Validate.js";

//ACID => Atomicidad - Consistencia - Aislamiento - Durabilidiad (Persistencia)

export const createVentaConProducto = async(req, res, next) => {
    const transaction = await dbConfig.transaction() //Esto ya da inicio al BEGIN de la transación
    
    try {
        //ID del usuario - 1 a muchos -> Un solo dato - String
        //objetos Productos -> Array<objetos>
            //ID de productos 
            //Precio de cada producto -------|_____subtotal
            //Cantidad de cada Producto -----|
        //fecha -> Puede o no puede estar, Si no esta, es un NOW()
            
        //Total -> Calculabe
        //1. Guardamos los datos desde la request
        const { usuarioId, productos, fechaVenta } = req.body;
        
        //2. Válidamoos que llegue la requiest
        isEmptyData(usuarioId, 'ID del usuario'); //Este válida que llego un ID desde la request
        isEmptyData(productos, 'Productos');

        //.3Verificamos que el usuario esta
        await notFoundDataRequestByPk(Usuario, usuarioId, true, transaction); //Este válida que EXISTE un usuario activo en este ID
  
        //4. Confirmamos los productos 4.5 Podemos sacar el total y el subttotal
        let total = 0
        for(const producto of productos) {
            if(!producto.productoId || !producto.cantidad || producto.cantidad <= 0) {
                throw new ValidationError(`Cada producto debe contener los campos productoId y cantidad mayor que 0`)
            }

            const productoData = await notFoundDataRequestByPk(Producto, producto.productoId, true, transaction);
            
            const subtotal = productoData.precio * producto.cantidad
            total += subtotal
        }

        //5. Verificar si se mando una fecha, sino mandar la fecha actual
        /* if (!fecha) return fecha = Date.now();
        const parseDate = new Date(fecha);

        if (isNaN(parseDate.getTime())) {
          throw new ValidationError(
            "La fecha debe tener el formato adecuado de YYYY-MM-DD"
          );
        }
        fecha = parseDate
        */
        const fecha = isValidDate(fechaVenta)

        //6.Crear el registro de venta 

        const ventaData = {
            usuarioId,
            fecha,
            total
        }

        const venta = await Venta.create(ventaData, { transaction: transaction });

        //De aquí hasta el COMMIT no es necesario para la Prueba... El Alan se agilo con este ejercicio

        //7. Insertar los detalles de las venta en VentaProducto

        for(const producto of productos) {
            const productoData = await notFoundDataRequestByPk(Producto, producto.productoId, true, transaction);

            const subtotal = productoData.precio * producto.cantidad;

            //8. Objeto con la data de Venta Producto para guardar la referencia en la base de datos
            const ventaPoductoData = {
                ventaId: venta.id,
                productoId: productoData.id,
                cantidad: producto.cantidad,
                subtotal
            }
            //Esto si lo tienen que hacer pero solo con los IDs, sin los campos adicionales para la prueba
            await VentasProductos.create(ventaPoductoData, { transaction: transaction });

            productoData.stock = productoData.stock - producto.cantidad;
            productoData.save();
        }

        await transaction.commit();

        res.status(201).json({
            message: 'Venta creada con éxito',
            status: 201,
            data: venta
        })
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        next(error)
    }
}