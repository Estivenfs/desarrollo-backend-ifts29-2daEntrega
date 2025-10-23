import { Paciente } from '../models/index.js';
import DatabaseService from '../models/DatabaseService.js';

const pacienteController = {
    // GET /api/pacientes - Obtener todos los pacientes
    async getAll(req, res) {
        try {
            const pacientes = await DatabaseService.getAll("pacientes");
            res.status(200).json({
                success: true,
                data: pacientes,
                count: pacientes.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener los pacientes',
                error: error.message
            });
        }
    },

    // GET /api/pacientes/:id - Obtener un paciente por ID
    async getById(req, res) {
        try {
            const { id } = req.params;
            const paciente = await DatabaseService.getById("pacientes", id);
            
            if (!paciente) {
                return res.status(404).json({
                    success: false,
                    message: 'Paciente no encontrado'
                });
            }

            res.status(200).json({
                success: true,
                data: paciente
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener el paciente',
                error: error.message
            });
        }
    },

    // POST /api/pacientes - Crear un nuevo paciente
    async create(req, res) {
        try {
            const pacienteData = req.body;
            const nuevoPaciente = await DatabaseService.create("pacientes", pacienteData);
            
            res.status(201).json({
                success: true,
                message: 'Paciente creado exitosamente',
                data: nuevoPaciente
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error al crear el paciente',
                error: error.message
            });
        }
    },

    // PUT /api/pacientes/:id - Actualizar un paciente
    async update(req, res) {
        try {
            const { id } = req.params;
            const pacienteData = req.body;
            
            const pacienteActualizado = await DatabaseService.update("pacientes", id, pacienteData);
            
            res.status(200).json({
                success: true,
                message: 'Paciente actualizado exitosamente',
                data: pacienteActualizado
            });
        } catch (error) {
            if (error.message === 'Paciente no encontrado') {
                return res.status(404).json({
                    success: false,
                    message: error.message
                });
            }
            
            res.status(400).json({
                success: false,
                message: 'Error al actualizar el paciente',
                error: error.message
            });
        }
    },

    // DELETE /api/pacientes/:id - Eliminar un paciente
    async delete(req, res) {
        try {
            const { id } = req.params;
            const eliminado = await DatabaseService.delete("pacientes", id);
            
            if (!eliminado) {
                return res.status(404).json({
                    success: false,
                    message: 'Paciente no encontrado'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Paciente eliminado exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al eliminar el paciente',
                error: error.message
            });
        }
    },

    // GET /api/pacientes/dni/:dni - Buscar paciente por DNI
    async getByDNI(req, res) {
        try {
            const { dni } = req.params;
            const paciente = await DatabaseService.getByDNI("pacientes", dni);
            
            if (!paciente) {
                return res.status(404).json({
                    success: false,
                    message: 'Paciente no encontrado con ese DNI'
                });
            }

            res.status(200).json({
                success: true,
                data: paciente
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al buscar el paciente',
                error: error.message
            });
        }
    },

    // GET /api/pacientes/obra-social/:obraSocial - Buscar pacientes por obra social
    async getByObraSocial(req, res) {
        try {
            const { obraSocial } = req.params;
            const pacientes = await DatabaseService.getByField("pacientes", "ObraSocial", obraSocial);
            
            res.status(200).json({
                success: true,
                data: pacientes,
                count: pacientes.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al buscar pacientes por obra social',
                error: error.message
            });
        }
    }
};

export default pacienteController;