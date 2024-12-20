import { Producto } from "../models/Producto.model.js"



export const createProduct = async(req, res, next) => {
    try {
        const product = await Producto.create(req.body)

        res.status(201).json({
            message: 'Producto creado con éxito',
            status: 201,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Producto.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    });

    isEmptyResponseData(products);

    res.status(200).json({
      message: "Productos encontrados con éxito",
      status: 200,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};


export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Producto.findByPk(id, {
        attributes: { 
            exclude: ['createdAt', 'updatedAt']
        }
    });

    isEmptyResponseData(products);

    res.status(200).json({
      message: "Producto encontrado con éxito",
      status: 200,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};


export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [updateRows, [updatedProduct]] = await Producto.update(req.body, {
      where: { id },
      returning: true,
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (updateRows === 0) {
      throw new NotFoundError(
        `No se encontró el producto con ID: ${id} para actualizar`
      );
    }

    res.status(200).json({
      message: "Producto actualizado con éxito",
      status: 200,
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Producto.destroy({ where: { id } });

    res.status(200).json({
      message: "Producto eliminado con éxito",
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};