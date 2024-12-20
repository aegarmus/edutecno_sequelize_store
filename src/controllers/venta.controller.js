import { dbConfig } from "../config/db.config.js"
import { ValidationError } from "../errors/TypeError.js";
import { Producto } from "../models/Producto.model.js";
import { Usuario } from "../models/Usuario.model.js";
import { isEmptyData, isValidDate, notFoundDataRequest } from "../utils/validations/Validate.js";



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
        const { usuarioId, productos, fecha } = req.body;
        
        //2. Válidamoos que llegue la requiest
        isEmptyData(usuarioId, 'ID del usuario'); //Este válida que llego un ID desde la request
        isEmptyData(productos, 'Productos');

        //.3Verificamos que el usuario esta
        await notFoundDataRequest(Usuario, usuarioId); //Este válida que EXISTE un usuario activo en este ID
  
        //4. Confirmamos los productos 4.5 Podemos sacar el total y el subttotal
        let total = 0
        for(const producto of productos) {
            if(!producto.productoId || !producto.cantidad || producto.cantidad <= 0) {
                throw new ValidationError(`Cada producto debe contener los campos productoId y cantidad mayor que 0`)
            }

            await notFoundDataRequest(Producto, producto.productoId);

            const subtotal = producto.precio * producto.cantidad
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
        fecha = isValidDate(fecha)

        //6.Crear el registro de venta 

        await transaction.commit()
    } catch (error) {
        await transaction.rollback()
        next(error)
    }
}


//Begin
//Commit
//Rollback