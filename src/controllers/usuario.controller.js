import { NotFoundError, ValidationError } from "../errors/TypeError.js";
import { Usuario }  from "../models/Usuario.model.js"
import { validateExistData } from "../utils/validations/Validate.js";


export const createUser = async(req, res, next) => {
    try {

        await validateExistData(Usuario, req.body, ['email', 'telefono']);

        const user = await Usuario.create(req.body);
        
        console.log(user)
        res.status(201).json({
            message: 'Usuario creado con éxito',
            status: 201,
            data: user
        })
    } catch (error) {
        next(error)
    }
}

export const getAllUsers = async(req, res, next) => {
    try {
        const users = await Usuario.findAll({ paranoid: false });

        res.status(200).json({
            message: 'Usuarios encontrados con éxito',
            status: 200,
            data: users
        })
    } catch (error) {
        next(error)
    }
}


export const getAllActiveUsers = async(req, res, next) => {
    try {
        const users = await Usuario.findAll();
        
        res.status(200).json({
            message: "Usuarios encontrados con éxito",
            status: 200,
            data: users,
        });
    } catch (error) {
        next(error)
    }
}

export const getUsersByFilters = async(req, res, next) => {
    try {
        const filters = req.query; //Esto devuelve un objeto con los filtros
        const whereCluase = {};
        
        for (const key in filters) {
            if (filters.hasOwnProperty(key)) {
                whereCluase[key] = filters[key]
            }
        }
        
        const users = await Usuario.findAll({
            where: { ...whereCluase,  }
            
        })
        
        res.status(200).json({
            message: "Usuarios encontrados con éxito",
            status: 200,
            data: users,
        });
    } catch (error) {
        next(error);
    }
}

export const getUserByIdIncludeDeleted = async(req, res, next) => {
    try {
      const { id } = req.params;

      const user = await Usuario.findByPk(id, { paranoid: false });

      res.status(200).json({
        message: "Usuario encontrado con éxito",
        status: 200,
        data: user,
      });
    } catch (error) {
      next(error);
    }
}


export const getActiveUserById = async(req, res, next) => {
    try {
        const { id } = req.params;

        const user = await Usuario.findOne({
            where: { id }
        })

        res.status(200).json({
          message: "Usuario encontrado con éxito",
          status: 200,
          data: user,
        });
    } catch (error) {
        next(error);
    }
}

export const updateUser = async(req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        await validateExistData(
          Usuario,
          updateData,
          ["email"],
          id
        );

        const [ updateRows, [ updateUser ] ] = await Usuario.update(updateData, {
            where: { id  },
            returning: true
        });

        if(updateRows === 0) {
            throw new ValidationError(`No se encontro al usuario con el ID: ${id}`)
        }

        res.status(200).json({
            message: "Usuario actualizado con éxito",
            status: 200,
            data: updateUser
        })
    } catch (error) {
        next(error)
    }
}


export const deletUser = async (req, res) => {
    try {
        const { id } = req.params
        
        const user = await Usuario.findByPk(id);

        if(!user) {
            throw new NotFoundError('No encontramos al usuario que deseas eliminar');
        }

        user.active = false
        await user.save()
        await user.destroy();

        res.status(200).json({
            message: 'Usuario Eliminado con éxito',
            status: 200,
        })
    } catch (error) {
        next(error)
    }
}


export const restoreUser =  async(req, res, next) => {
    try {
        const { id } = req.params;

        const usuario = await Usuario.findByPk(id, { paranoid: false })

        if(!usuario) throw new NotFoundError('Usuario no encontrado para restaurar');
        if(usuario.deletedAt === null) throw new ValidationError('El usuario no ha sido eliminado');

        usuario.active = 'true',
        usuario.save();
        await usuario.restore();

        res.status(200).json({
          message: "Usuario Restaurado con éxito",
          status: 200,
          data: usuario
        });
    } catch (error) {
        next(error)
    }
}