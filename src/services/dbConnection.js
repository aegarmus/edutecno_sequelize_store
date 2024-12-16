import { dbConfig } from "../config/db.config.js"

export const dbConnect = async() => {
    try {
        await dbConfig.authenticate();
        console.log('Logramos conectarnos a Postgre a traves de Sequelize 😱')
    } catch (error) {
        console.error('No pudimos conectarnos a la DB 👻', error);
        process.exit(1)
    }
}