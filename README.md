# Backend IFTS-29 - Sistema de Gestión Médica - Grupo 4

Sistema de gestión médica con estructura MVC (Modelo-Vista-Controlador) desarrollado con Node.js, Express, ES6 Modules, Pug y MongoDB Atlas. Permite la administración completa de pacientes, médicos y turnos médicos.

## 🚀 Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
Crear un archivo `.env` en la raíz del proyecto con la siguiente variable:
```
MONGO_URI=<Tu string de conexión a MongoDB Atlas>
```

3. Ejecutar en modo desarrollo:
```bash
npm run dev
```

4. Ejecutar en modo producción:
```bash
npm start
```

## 📁 Estructura del Proyecto

```
src/
├── app.js              # Archivo principal de la aplicación (ES6 modules)
├── config/             # Configuración de la aplicación
│   └── db.js           # Configuración de la conexión a MongoDB
├── models/             # Modelos de datos
│   ├── index.js        # Exportador de modelos
│   ├── DatabaseService.js # Servicio de base de datos (abstracción para operaciones CRUD)
│   ├── Paciente.js     # Modelo de paciente
│   ├── Medico.js       # Modelo de médico
│   └── Turno.js        # Modelo de turno médico
├── views/              # Vistas Pug
│   ├── index.pug       # Página principal
│   ├── pacientes.pug   # Gestión de pacientes
│   ├── medicos.pug     # Gestión de médicos
│   └── turnos.pug      # Gestión de turnos
├── controllers/        # Controladores de lógica de negocio
│   ├── index.js        # Exportador de controladores
│   ├── pacienteController.js # Controlador de pacientes
│   ├── medicoController.js   # Controlador de médicos
│   └── turnoController.js    # Controlador de turnos
├── routes/             # Definición de rutas
│   ├── index.js        # Rutas principales
│   ├── pacienteRoutes.js # Rutas de pacientes
│   ├── medicoRoutes.js   # Rutas de médicos
│   └── turnoRoutes.js    # Rutas de turnos
└── middleware/         # Middleware personalizado
    └── index.js        # Middleware de logging y errores
```

## 🔗 Endpoints Disponibles

### Rutas Principales
- `GET /` - Página principal del sistema
- `GET /pacientes` - Interfaz de gestión de pacientes
- `GET /medicos` - Interfaz de gestión de médicos
- `GET /turnos` - Interfaz de gestión de turnos
- `GET /api/status` - Estado de la API

### API de Pacientes
- `GET /api/pacientes` - Obtener todos los pacientes
- `GET /api/pacientes/:id` - Obtener paciente por ID
- `GET /api/pacientes/dni/:dni` - Buscar paciente por DNI
- `POST /api/pacientes` - Crear nuevo paciente
- `PUT /api/pacientes/:id` - Actualizar paciente
- `DELETE /api/pacientes/:id` - Eliminar paciente

### API de Médicos
- `GET /api/medicos` - Obtener todos los médicos
- `GET /api/medicos/:id` - Obtener médico por ID
- `GET /api/medicos/dni/:dni` - Buscar médico por DNI
- `GET /api/medicos/especialidad/:especialidad` - Buscar médicos por especialidad
- `POST /api/medicos` - Crear nuevo médico
- `PUT /api/medicos/:id` - Actualizar médico
- `DELETE /api/medicos/:id` - Eliminar médico

### API de Turnos
- `GET /api/turnos` - Obtener todos los turnos
- `GET /api/turnos/:id` - Obtener turno por ID
- `GET /api/turnos/paciente/:idPaciente` - Obtener turnos de un paciente
- `GET /api/turnos/medico/:idMedico` - Obtener turnos de un médico
- `POST /api/turnos` - Crear nuevo turno
- `PUT /api/turnos/:id` - Actualizar turno
- `DELETE /api/turnos/:id` - Eliminar turno

## 📝 Ejemplo de Uso

### Crear un paciente
```bash
curl -X POST http://localhost:3000/api/pacientes \
  -H "Content-Type: application/json" \
  -d '{
    "Nombre": "Juan",
    "Apellido": "Pérez",
    "DNI": "12345678",
    "Edad": 35,
    "Sexo": "M",
    "ObraSocial": "OSDE",
    "NroAfiliado": "123456789"
  }'
```

### Crear un médico
```bash
curl -X POST http://localhost:3000/api/medicos \
  -H "Content-Type: application/json" \
  -d '{
    "Nombre": "Dr. María",
    "Apellido": "González",
    "DNI": "87654321",
    "Especialidad": "Cardiología"
  }'
```

### Crear un turno
```bash
curl -X POST http://localhost:3000/api/turnos \
  -H "Content-Type: application/json" \
  -d '{
    "IdPaciente": "635f8f8f8f8f8f8f8f8f8f8f",
    "IdMedico": "635f8f8f8f8f8f8f8f8f8f8f",
    "Fecha": "2024-02-15",
    "HoraInicio": "09:00",
    "HoraFin": "09:30"
  }'
```

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MongoDB Atlas** - Base de datos NoSQL en la nube
- **Pug** - Motor de plantillas (anteriormente Jade)
- **ES6 Modules** - Sistema de módulos moderno (import/export)
- **Nodemon** - Herramienta de desarrollo para reinicio automático

## 📋 Características

- ✅ **Gestión completa de pacientes** - CRUD con validaciones
- ✅ **Gestión de médicos** - Especialidades y búsquedas avanzadas
- ✅ **Sistema de turnos** - Validación de conflictos horarios
- ✅ **Interfaz web intuitiva** - Desplegables con información visual
- ✅ **Validaciones robustas** - Fechas posteriores, horarios válidos
- ✅ **Base de datos MongoDB** - Persistencia de datos en la nube
- ✅ **API RESTful completa** - Operaciones CRUD para todas las entidades
- ✅ **Búsquedas especializadas** - Por DNI, especialidad, etc.
- ✅ **Estructura MVC organizada** - Separación clara de responsabilidades
- ✅ **Middleware personalizado** - Logging y manejo de errores
- ✅ **ES6 Modules** - Sistema de módulos moderno

## 🔧 Configuración

El servidor se ejecuta por defecto en el puerto 3000. Puedes cambiarlo configurando la variable de entorno `PORT`:

```bash
PORT=8000 npm start
```

La conexión a la base de datos se configura a través de la variable de entorno `MONGO_URI`.

## 🏥 Funcionalidades del Sistema

### Gestión de Pacientes
- Registro completo con datos personales y obra social
- Búsqueda por DNI
- Validación de datos de entrada
- Interfaz con desplegables para selección visual

### Gestión de Médicos
- Registro con especialidades médicas
- Búsqueda por DNI y especialidad
- Múltiples especialidades disponibles
- Interfaz intuitiva para modificaciones

### Sistema de Turnos
- Asignación de turnos médicos
- Validación de conflictos horarios
- Verificación de fechas posteriores
- Control de horarios válidos (inicio < fin)
- Búsqueda por paciente o médico

## 📚 Próximos Pasos

Para expandir este proyecto, puedes:

1. **Implementar autenticación** (JWT, sessions)
2. **Agregar reportes médicos** y historiales clínicos
3. **Implementar tests** (Jest, Mocha)
4. **Agregar notificaciones** por email/SMS
5. **Implementar logging avanzado** (Winston)
6. **Agregar dashboard** con estadísticas
7. **Implementar calendario visual** para turnos
8. **Agregar sistema de roles** (admin, recepcionista, médico)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request
