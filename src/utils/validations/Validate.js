import { Op } from "sequelize"
import { ValidationError } from "../../errors/TypeError.js"

/**
 * Valida que el regsitro que se esta evaluando no exista previamente para un campo dado que se espera que sea único. En caso de existir un valor dúplicado en un campo único, arrojara un error de validación
 * @param {Model} Modelo - Modelo constructor de los datos que se comúnica con la DB
 * @param {object} data - Datos a evaluar en la petición hacia la DB 
 * @param {string} field - Campo que se desea evaluar en la clausula Where
 * @param {string} excluidID - ID en formato UUID que será excluida de esta validación. Por defecto es null 
 * @throws {ValidationError} - Si el valor existe arrojara un error de validación 
 */
export const validateExistData = async(Modelo, data, field, excluidID = null ) => {
        if(data[field]) {
            const whereClause = { [field]: data[field] }

            //Esto verifica si se debe excluir el registro que se esta evaluando (útil para los update)
            if(excluidID) {
                whereClause.id = { [Op.ne]: excluidID} //Op.ne => Operador (Sequelize) Not Equal(ne)
            }

            const existData = await Modelo.findOne({ where: whereClause})
            if(existData) {
                throw new ValidationError(`El campo "${field}" ya esta en uso por otro registro en "${Modelo}"`)
            }
        }
}