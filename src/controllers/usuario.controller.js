import { Usuario }  from "../models/Usuario.model.js"


export const createUser = async(req, res) => {
    try {
        const user = await Usuario.create(req.body);
        
        console.log(user)
        res.status(201).json({
            message: 'Usuario creado con éxito',
            status: 201,
            data: user
        })
    } catch (error) {
        console.error(error)
    }
}

export const getAllUsers = async(req, res) => {
    try {
        const users = await Usuario.findAll();

        res.status(200).json({
            message: 'Usuarios encontrados con éxito',
            status: 200,
            data: users
        })
    } catch (error) {
        console.error(error)
    }
}

export const getAllActiveUsers = async(req, res) => {
    try {
        const users = await Usuario.findAll({
            where: { active: true }
        });

        res.status(200).json({
          message: "Usuarios encontrados con éxito",
          status: 200,
          data: users,
        });
    } catch (error) {
        console.error(error)
    }
}

export const getUsersByFilters = async(req, res) => {
    try {
        const filters = req.query; //Esto devuelve un objeto con los filtros
        const whereCluase = {};

        for (const key in filters) {
            if (filters.hasOwnProperty(key)) {
                whereCluase[key] = filters[key]
            }
        }

        const users = await Usuario.findAll({
            where: { ...whereCluase, active: true }

        })

        res.status(200).json({
          message: "Usuarios encontrados con éxito",
          status: 200,
          data: users,
        });
    } catch (error) {
        console.error(error);
    }
}

export const getUserById = async( req, res ) => {
    try {
        const { id } = req.params;

        const user = await Usuario.findByPk(id)

        res.status(200).json({
          message: "Usuario encontrado con éxito",
          status: 200,
          data: user,
        });
    } catch (error) {
        console.error(error);
    }
}

export const getActiveUserById = async(req, res) => {
    try {
        const { id } = req.params;

        const user = await Usuario.findOne({
            where: { id, active: true}
        })

        res.status(200).json({
          message: "Usuario encontrado con éxito",
          status: 200,
          data: user,
        });
    } catch (error) {
        console.error(error);
    }
}

export const updateUser = async(req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const [ updateRows, [ updateUser ] ] = await Usuario.update(updateData, {
            where: { id, active: true },
            returning: true
        });

        if(updateRows === 0) {
            console.error(`No se encontro al usuario con el ID: ${id}`)
        }

        res.status(200).json({
            message: "Usuario actualizado con éxito",
            status: 200,
            data: updateUser
        })
    } catch (error) {
        console.error(error);
    }
}