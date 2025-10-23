// Archivo principal para las rutas
import express from 'express';
import pacienteRoutes from './pacienteRoutes.js';
import medicoRoutes from './medicoRoutes.js';
import turnoRoutes from './turnoRoutes.js';

import Paciente from '../models/Paciente.js';
import Medico from '../models/Medico.js';
import Turno from '../models/Turno.js';
import DatabaseService from '../models/DatabaseService.js';

const router = express.Router();

// 🟢 Dashboard principal con datos reales desde DatabaseService
router.get('/', async (req, res) => {
  try {
    const turnos = await DatabaseService.getAll("turnos");
    const pacientes = await DatabaseService.getAll("pacientes");
    const medicos = await DatabaseService.getAll("medicos");

    // Si querés limitar la cantidad mostrada
    const ultimosTurnos = turnos.slice(-6).reverse();
    const ultimosPacientes = pacientes.slice(-6).reverse();

    res.render('index', {
      title: 'Dashboard - Clínica Salud Integral',
      turnos: ultimosTurnos,
      pacientes: ultimosPacientes,
      medicos,
      metrics: {
        turnos: turnos.length,
        pacientes: pacientes.length,
        medicos: medicos.length
      }
    });
  } catch (error) {
    console.error('Error cargando datos del dashboard:', error);
    res.render('index', {
      title: 'Dashboard - Clínica Salud Integral',
      turnos: [],
      pacientes: [],
      medicos: [],
      metrics: { turnos: 0, pacientes: 0, medicos: 0 },
      error: 'Error al obtener datos de la base de datos'
    });
  }
});

// 🩺 Rutas para vistas individuales
router.get('/pacientes', (req, res) => {
  res.render('pacientes', { title: 'Gestión de Pacientes' });
});

router.get('/medicos', (req, res) => {
  res.render('medicos', { title: 'Gestión de Médicos' });
});

router.get('/turnos', (req, res) => {
  res.render('turnos', { title: 'Gestión de Turnos' });
});

// 🧠 Estado de la API
router.get('/api/status', (req, res) => {
  res.json({
    status: 'success',
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString(),
    database: 'MongoDB Atlas',
    endpoints: {
      pacientes: '/api/pacientes',
      medicos: '/api/medicos',
      turnos: '/api/turnos',
      status: '/api/status'
    }
  });
});

// Rutas API
router.use('/api/pacientes', pacienteRoutes);
router.use('/api/medicos', medicoRoutes);
router.use('/api/turnos', turnoRoutes);

export default router;