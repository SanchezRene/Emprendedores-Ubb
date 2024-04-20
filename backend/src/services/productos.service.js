"use strict";
const Productos = require("../models/productos.model.js");
const Emprendedor = require("../models/emprendedor.model.js");
const { handleError } = require("../utils/errorHandler");
const { PORT, HOST } = require("../config/configEnv.js");
const fs = require("fs");
const path = require("path");

async function getProductos() {
  try {
    const productos = await Productos.find();
    if (productos.length == 0)
      return [null, "La colección de productos está vacía"];

    return [productos, null];
  } catch (error) {
    handleError(error, "productos.service -> getProductos");
  }
}

async function getProductoById(id) {
  try {
    const producto = await Productos.findById(id);
    if (!producto) return [null, "Producto no encontrado"];

    return [producto, null];
  } catch (error) {
    handleError(error, "productos.service -> getProductoById");
  }
}

async function getProductosByEmprendedorId(emprendedorId) {
  try {
    const emprendedor = await Emprendedor.findById(emprendedorId);
    if (!emprendedor) return [null, "No se encontró el emprendedor"];

    const productos = await Productos.find({ emprendedorId: emprendedorId });
    if (productos.length == 0)
      return [null, "No hay productos para este emprendedor"];

    return [productos, null];
  } catch (error) {
    handleError(error, "productos.service -> getProductosByEmprendedorId");
  }
}

async function createProducto(producto, fotografia) {
  try {
    const { nombre, categoria, descripcion, stock, emprendedorId } = producto;

    const emprendedor = await Emprendedor.findById(emprendedorId);
    if (!emprendedor) return [null, "Emprendedor no encontrado"];

    //Verificar que el emprendedor no tenga productos repetidos
    const productoFound = await Productos.findOne({
      nombre: nombre,
      emprendedorId: emprendedorId,
    });
    if (productoFound) return [null, "Producto ya existe"];

    // Verificar que el emprendedor no tenga más de 10 productos
    const productosCount = await Productos.countDocuments({
      emprendedorId: emprendedorId,
    });
    if (productosCount >= 10)
      return [
        null,
        "El emprendedor ya tiene 10 productos, no se puede crear más",
      ];

    const url = `http:/${HOST}:${PORT}/api/productos/uploads/${fotografia}`;

    const newProducto = new Productos({
      nombre: nombre,
      categoria: categoria,
      fotografia: url,
      descripcion: descripcion,
      stock: stock,
      emprendedorId: emprendedorId,
    });

    const productoCreated = await newProducto.save();

    //agregar producto al array de productosId del emprendedor
    emprendedor.productosId.push(productoCreated._id);
    await emprendedor.save();

    return [productoCreated, null];
  } catch (error) {
    handleError(error, "productos.service -> createProducto");
  }
}

async function updateProducto(id, producto, fotografia) {
  try {
    const { nombre, categoria, descripcion, stock, emprendedorId } = producto;

    //Verificar que el emprendedor exista
    const emprendedor = await Emprendedor.findById(emprendedorId);
    if (!emprendedor) return [null, "Emprendedor no encontrado"];

    //Verificar que producto exista
    const productoFound = await Productos.findById(id);
    if (!productoFound) return [null, "Producto no encontrado"];

    /*Asegurarnos de que los productos sigan siendo propiedad de los mismos emprendedores y no se transfieran a otros.*/
    if (productoFound.emprendedorId.toString() !== emprendedorId)
      return [null, "No se puede cambiar el 'emprendedorId' del producto"];

    //reemplazar fotografia del servidor
    const filename = productoFound.fotografia.split("/").pop();
    const pathFile = path.join(__dirname, `../../public/uploads/${filename}`);
    fs.unlink(pathFile, (err) => {
      if (err) {
        console.error("Error al actualizar el archivo:", err);
      } else {
        console.log("Archivo actualizado exitosamente");
      }
    });

    const url = `http:/${HOST}:${PORT}/api/productos/uploads/${fotografia}`;

    const updatedProducto = await Productos.findByIdAndUpdate(
      id,
      {
        nombre: nombre,
        categoria: categoria,
        fotografia: url,
        descripcion: descripcion,
        stock: stock,
        emprendedorId: emprendedorId,
      },
      { new: true },
    );

    if (!updatedProducto) return [null, "Producto no se actualizó"];

    return [updatedProducto, null];
  } catch (error) {
    handleError(error, "productos.service -> updateProductoById");
  }
}

async function deleteProducto(id) {
  try {
    const deletedProducto = await Productos.findByIdAndDelete(id);
    if (!deletedProducto) return [null, "Producto no eliminado"];

    const emprendedor = await Emprendedor.findById(
      deletedProducto.emprendedorId,
    );
    if (!emprendedor) return [null, "Emprendedor no encontrado"];

    //borrar producto del array de productosId
    emprendedor.productosId.pull(deletedProducto._id);
    await emprendedor.save();

    //borrar fotografia del servidor
    const filename = deletedProducto.fotografia.split("/").pop();
    const pathFile = path.join(__dirname, `../../public/uploads/${filename}`);
    fs.unlink(pathFile, (err) => {
      if (err) {
        console.error("Error al eliminar el archivo:", err);
      } else {
        console.log("Archivo eliminado exitosamente");
      }
    });

    return [deletedProducto, filename, null];
  } catch (error) {
    handleError(error, "productos.service -> deleteProductoById");
  }
}

module.exports = {
  getProductos,
  getProductoById,
  getProductosByEmprendedorId,
  createProducto,
  updateProducto,
  deleteProducto,
};
