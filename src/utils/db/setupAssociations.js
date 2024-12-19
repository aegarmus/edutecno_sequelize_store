import { DataBaseError } from "../../errors/TypeError.js";
import { setupUsuarioVenta } from "../../models/asociaciones/usuario_venta.association.js"

export const setupAssociation = () => {
    try {
        setupUsuarioVenta();
    } catch (error) {
        console.error('Error al inicializar las relaciones', error);
        throw new DataBaseError('Error al iniicalizar las asociaciones', error)
    }
}