import { ModeloMascota } from "../models/mascotas.model.js";

export const crearMascota = async (req, res) => {
    try {
        const nuevaMascota = new ModeloMascota(req.body);
        const mascotaGuardada = await nuevaMascota.save();
        return res.status(201).json({ mensaje: "Mascota se agregó exitosamente", mascota: mascotaGuardada });
    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }
};

export const obtenerMascotas = async (req, res) => {
    try {
        const mascotas = await ModeloMascota.find();
        return res.status(200).json({ mensaje: "Mascotas obtenidas exitosamente", mascotas });
    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }
};

export const obtenerMascotaPorId = async (req, res) => {
    try {
        const mascota = await ModeloMascota.findById(req.params.id);
        if (!mascota) return res.status(404).json({ mensaje: "Mascota no encontrada" });
        return res.status(200).json({ mensaje: "Mascota obtenida exitosamente", mascota });
    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }
};

export const actualizarMascota = async (req, res) => {
    try {
        const mascotaActualizada = await ModeloMascota.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!mascotaActualizada) return res.status(404).json({ mensaje: "Mascota no encontrada" });
        return res.status(200).json({ mensaje: "Mascota actualizada exitosamente", mascota: mascotaActualizada });
    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }
};

export const eliminarMascota = async (req, res) => {
    try {
        const mascotaEliminada = await ModeloMascota.findByIdAndDelete(req.params.id);
        if (!mascotaEliminada) return res.status(404).json({ mensaje: "Mascota no encontrada" });
        return res.status(200).json({ mensaje: "Mascota eliminada correctamente" });
    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }
};