import { Usuario } from "../Usuario.model.js";
import { Venta } from "../Venta.model.js";


//Este es un caso de 1 es a Muchos
export const setupUsuarioVenta = () => {
    Usuario.hasMany(Venta, {
        foreignKey: 'usuarioId',
        as: 'ventas'
    });
    
    Venta.belongsTo(Usuario, {
        foreignKey: 'usuarioId',
        as: 'usuario'
    })

}