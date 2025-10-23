import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Carga las variables del archivo .env

/**
 * connectDB
 * Intenta conectar usando la variable de entorno MONGO_URI.
 * Si no existe, construye la URI desde MONGO_USER, MONGO_PASS, MONGO_HOST y MONGO_DB.
 */
const buildUriFromParts = () => {
    const user = process.env.MONGO_USER;
    const pass = process.env.MONGO_PASS;
    const host = process.env.MONGO_HOST; // p.ej. cluster0.ud5a5jj.mongodb.net
    const dbName = process.env.MONGO_DB; // nombre de la base de datos
    if (!host || !dbName) return null;

    if (user && pass) {
        return `mongodb+srv://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@${host}/${dbName}?retryWrites=true&w=majority`;
    }

    // Si no hay credenciales, asumir acceso sin usuario (poco común en Atlas)
    return `mongodb+srv://${host}/${dbName}?retryWrites=true&w=majority`;
};

const connectDB = async () => {
    const uri = process.env.MONGO_URI || buildUriFromParts();

    if (!uri) {
        console.error('❌ No se encontró la URI de MongoDB. Define MONGO_URI o las variables MONGO_HOST y MONGO_DB.');
        process.exit(1);
    }

    try {
        await mongoose.connect(uri, {
            // opciones modernas; mongoose 6+ ya usa estas por defecto
        });
        console.log('✅ Conectado a MongoDB correctamente');
    } catch (error) {
        console.error('❌ Error al conectar con MongoDB:', error.message);
        process.exit(1); // Detiene la app si la conexión falla
    }
};

export default connectDB;
