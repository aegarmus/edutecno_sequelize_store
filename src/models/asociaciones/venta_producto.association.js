import { Venta } from "../Venta.model.js";
import { Producto } from "../Producto.model.js";
import { VentasProductos } from "../VentaProducto.model.js";


//Esto es un caso de Muchos es a Muchos
export const setupVentaProducto = () => {
    Venta.belongsToMany(Producto, {
        through: VentasProductos,
        foreignKey: 'ventaId',
        otherKey: 'productoId',
        as: 'productos'
    })

    Producto.belongsToMany(Venta, {
        through: VentasProductos,
        foreignKey: 'productoId',
        otherKey: 'ventaId',
        as: 'ventas'
    })

}