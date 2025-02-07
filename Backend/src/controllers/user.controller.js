import { userModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  try {
    const { image, fullName, email, password, role, phone, isAdult, address, preferences } = req.body;
    const codedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      image,
      fullName,
      email,
      password: codedPassword,
      role,
      phone,
      isAdult,
      address,
      preferences,
    });

    return res.status(201).json({
      mensaje: "Usuario creado correctamente",
      datos: newUser,
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ocurrió un error al crear un usuario",
      problema: error.message,
    });
  }
};

export const showUsers = async (req, res) => {
  try {
    const users = await userModel.find();

    if (users.length === 0) {
      return res.status(200).json({
        mensaje: "No hay usuarios almacenados",
      });
    }

    return res.status(200).json({
      mensaje: "Se encontraron usuarios almacenados",
      numeroUsuarios: users.length,
      datos: users,
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ocurrió un error al mostrar los usuarios",
      problema: error.message,
    });
  }
};

export const putUserById = async (req, res) => {
  try {
    const idForPut = req.params.id;
    const dataForUpdate = req.body;

    const userUpdated = await userModel.findByIdAndUpdate(idForPut, dataForUpdate, { new: true });

    if (!userUpdated) {
      return res.status(404).json({
        mensaje: "No se encontró usuario para actualizar",
      });
    }

    return res.status(200).json({
      mensaje: "Usuario actualizado correctamente",
      datos: userUpdated,
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ocurrió un error al actualizar el usuario",
      problema: error.message,
    });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const idForDelete = req.params.id;

    await userModel.findByIdAndDelete(idForDelete);

    return res.status(200).json({
      mensaje: "Usuario eliminado exitosamente",
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ocurrió un error al eliminar el usuario",
      problema: error.message,
    });
  }
};