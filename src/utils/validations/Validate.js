import { ValidationError } from "../../errors/TypeError.js"

/**
 * Valida que el regsitro que se esta evaluando no exista previamente para un campo dado que se espera que sea único. En caso de existir un valor dúplicado en un campo único, arrojara un error de validación
 * @param {class} Modelo - Modelo constructor de los datos que se comúnica con la DB
 * @param {object} data - Datos a evaluar en la petición hacia la DB 
 * @param {string} field - Campo que se desea evaluar en la clausula Where 
 */
export const validateExistData = async(Modelo, data, field) => {
        if(data[field]) {
            const whereClause = { [field]: data[field] }


            const existData = await Modelo.findOne({ where: whereClause})
            if(existData) {
                throw new ValidationError(`El campo "${field}" ya esta en uso por otro registro en "${Modelo}"`)
            }
        }
}