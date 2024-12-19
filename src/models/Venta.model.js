import { DataTypes, Model } from "sequelize";

export class Venta extends Model {}

export const initVenta = (dbConfig) => {
    Venta.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        fecha: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0
            }
        }
    }, {
        sequelize: dbConfig,
        modelName: 'Venta',
        tableName: 'venta',
        timestamps: true
    })
}