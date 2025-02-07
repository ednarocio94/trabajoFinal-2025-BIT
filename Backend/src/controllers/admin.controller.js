import { adminModel } from "../models/admin.model.js";
import bcrypt from "bcryptjs";

// Crear un administrador
export const createAdmin = async (req, res) => {
  try {
    const { image, fullName, email, password, role } = req.body;
    const codedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await adminModel.create({
      image,
      fullName,
      email,
      password: codedPassword,
      role,
    });
    return res.status(201).json({
      mensaje: "Administrador creado correctamente",
      datos: newAdmin,
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ocurrió un error al crear un Administrador",
      problema: error.message,
    });
  }
};

// Obtener todos los administradores
export const showAdmin = async (req, res) => {
  try {
    let admins = await adminModel.find();
    if (admins.length === 0) {
      return res.status(200).json({
        mensaje: "No hay administradores almacenados",
      });
    }
    return res.status(200).json({
      mensaje: "Se encontraron Administradores almacenados",
      numeroAdministradores: admins.length,
      datos: admins,
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ocurrió un error al mostrar los administradores",
      problema: error.message,
    });
  }
};

// Actualizar un administrador
export const updateAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAdmin = await adminModel.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json({
      mensaje: "Administrador actualizado correctamente",
      datos: updatedAdmin,
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ocurrió un error al actualizar el administrador",
      problema: error.message,
    });
  }
};

// Eliminar un administrador
export const deleteAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    await adminModel.findByIdAndDelete(id);
    return res.status(200).json({
      mensaje: "Administrador eliminado exitosamente",
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ocurrió un error al eliminar Administrador",
      problema: error.message,
    });
  }
};