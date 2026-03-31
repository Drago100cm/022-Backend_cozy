// index.js
const variable= require("dotenv").config();
const express = require('express');
const cors = require('cors');
const conection= require("./database/conection");
conection();

const RentaRoutes = require('./routes/renta.routes');
const RoomsRoutes = require('./routes/room.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const commentRoutes = require('./routes/comment.routes');

const roles = require('./routes/rol.routes');
const permiso= require('./routes/permisos.routes');

const { version }= require('mongoose');

const { apiReference } = require('@scalar/express-api-reference'); // <-- NUEVO
const openapi = require('./openapi'); // <-- NUEVO

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const PORT = 3000;

// CORS y body parsers
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas de tu API
app.use('/api/Rentas', RentaRoutes);
app.use('/api/Room', RoomsRoutes);
app.use('/api/usuarios', usuarioRoutes);

app.use('/api/roles', roles);
app.use('/api/permiso', permiso);
app.use('/api/comment', commentRoutes);// ---- Docs ----
// OpenAPI JSON generado desde JSDoc
app.get('/openapi.json', (_, res) => res.json(openapi));

// UI interactiva de Scalar con “Try it”
app.use('/api-explorer', apiReference({
  // Puedes apuntar a la misma ruta interna
  // o a una URL pública si lo hospedas fuera
  url: '/openapi.json',
  // Opcional: theme: 'purple' | 'alternate' | 'moon' | 'solarized'
  // theme: 'purple',
}));

// Server
app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
  // console.log(`Scalar UI: http://localhost:${PORT}/api-explorer`);
});
