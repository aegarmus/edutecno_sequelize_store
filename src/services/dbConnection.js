import { dbConfig } from "../config/db.config.js"
import { initUsuario } from "../models/Usuario.model.js";



export const dbConnect = async() => {
    try {
        
        await dbConfig.authenticate();
        initUsuario(dbConfig)
        await dbConfig.sync()

        console.log('Logramos conectarnos a Postgre a traves de Sequelize 😱')
    } catch (error) {
        console.error('No pudimos conectarnos a la DB 👻', error);
        process.exit(1)
    }
}