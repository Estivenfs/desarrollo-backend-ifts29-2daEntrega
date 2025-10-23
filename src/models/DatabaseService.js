import connectDB from '../config/db.js';
// Importamos el mapeo de modelos que creamos
import { Models } from '../models/index.js'; 

class DatabaseService {
    constructor() {
        // Conectar a MongoDB. Esto se hace una sola vez al iniciar la aplicación.
        async function connectDB1() {
            await connectDB(); 
        }
        connectDB1();
        // Ya no necesitamos this.dbPath, ni path/fs.
    }

    /**
     * Obtener todos los registros de una colección (tabla)
     * @param {string} tableName - El nombre de la colección ('pacientes', 'medicos', etc.)
     * @returns {Promise<Array>}
     */
    async getAll(tableName) {
        const Model = Models[tableName];
        if (!Model) {
            console.error(`Modelo no encontrado para: ${tableName}`);
            return [];
        }
        try {
            // .find({}) obtiene todos los documentos de la colección
            return await Model.find({});
        } catch (error) {
            console.error(`Error al obtener todos los registros de ${tableName}:`, error);
            throw error;
        }
    }

    /**
     * Obtener un registro por ID
     * @param {string} tableName - El nombre de la colección
     * @param {string} id - El ID del documento (ObjectId de MongoDB)
     * @returns {Promise<Object | null>}
     */
    async getById(tableName, id) {
        const Model = Models[tableName];
        if (!Model) return null;
        try {
            // .findById() busca por el campo _id
            return await Model.findById(id);
        } catch (error) {
             // Es común que findById arroje un error si el 'id' no tiene formato ObjectId válido
            console.error(`Error al obtener registro ${id} en ${tableName}:`, error);
            return null;
        }
    }

    /**
     * Crear un nuevo registro
     * @param {string} tableName - El nombre de la colección
     * @param {Object} newRecord - Los datos del nuevo registro
     * @returns {Promise<Object | null>}
     */
    async create(tableName, newRecord) {
        const Model = Models[tableName];
        if (!Model) {
            throw new Error(`Modelo no encontrado para: ${tableName}`);
        }
        
        try {
            // Mongoose se encarga de:
            // 1. Validar campos requeridos y tipos.
            // 2. Validar unicidad (como el DNI), si se definió en el esquema.
            // 3. Generar el campo _id automáticamente.
            const record = new Model(newRecord);
            return await record.save();
        } catch (error) {
            // Mongoose lanza un error si la validación falla (ej. DNI duplicado)
            if (error.code === 11000) { // Código de error de duplicado de MongoDB
                throw new Error('El DNI ya existe en la base de datos.');
            }
            console.error(`Error creando registro en ${tableName}:`, error);
            throw error;
        }
    }

    /**
     * Actualizar un registro por ID
     * @param {string} tableName - El nombre de la colección
     * @param {string} id - El ID del documento
     * @param {Object} updatedData - Los campos a actualizar
     * @returns {Promise<Object | null>} El documento actualizado
     */
    async update(tableName, id, updatedData) {
        const Model = Models[tableName];
        if (!Model) return null;
        
        try {
            // .findByIdAndUpdate: Busca por _id y actualiza. 
            // { new: true } asegura que retorna el documento actualizado, no el original.
            return await Model.findByIdAndUpdate(
                id,
                updatedData,
                { new: true, runValidators: true } // runValidators: para ejecutar las validaciones del esquema
            );
        } catch (error) {
            console.error(`Error actualizando registro ${id} en ${tableName}:`, error);
            throw error;
        }
    }

    /**
     * Eliminar un registro por ID
     * @param {string} tableName - El nombre de la colección
     * @param {string} id - El ID del documento
     * @returns {Promise<boolean>}
     */
    async delete(tableName, id) {
        const Model = Models[tableName];
        if (!Model) return false;

        try {
            // .findByIdAndDelete: Busca y elimina por _id
            const result = await Model.findByIdAndDelete(id);
            // Si result no es nulo, el documento fue eliminado
            return !!result;
        } catch (error) {
            console.error(`Error eliminando registro ${id} en ${tableName}:`, error);
            return false;
        }
    }

    /**
     * Obtener un registro por DNI
     * @param {string} tableName - El nombre de la colección ('medicos' o 'pacientes')
     * @param {string} dni - El DNI del registro
     * @returns {Promise<Object | null>}
     */
    async getByDNI(tableName, dni) {
        const Model = Models[tableName];
        if (!Model) return null;
        try {
            return await Model.findOne({ DNI: dni });
        } catch (error) {
            console.error(`Error al obtener registro con DNI ${dni} en ${tableName}:`, error);
            return null;
        }
    }

    /**
     * Obtener registros por campo
     * @param {string} tableName - El nombre de la colección ('medicos')
     * @param {string} field - El campo a buscar
     * @param {string} value - El valor a buscar
     * @returns {Promise<Array>}
     */
    async getByField(tableName, field, value) {
        const Model = Models[tableName];
        if (!Model) return [];
        try {
            return await Model.find({ [field]: value });
        } catch (error) {
            console.error(`Error al obtener registros con ${field} ${value} en ${tableName}:`, error);
            return [];
        }
    }
}

export default new DatabaseService();