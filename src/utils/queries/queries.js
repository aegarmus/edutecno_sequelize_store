
export const getDataJoin = async (Model, ModelJoins, attributes, { orderAttribute, order: 'ASC' }) => {
    const data = await Model.findAll({
        include: ModelJoins.map(model => ({
            model: model,
            as: `${model.tableName}`,
            attribute: attributes.map(attribute => {
                if(attribute.model === model.modelName) return `${attribute.name}`
            })
        }),
        order: [[orderAttribute, order]])
    })
}