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

// ← NUEVAS
const solicitudRoutes = require('./routes/solicitudDeRenta.routes');
const pagoRoutes = require('./routes/pago.routes');

const productRoutes = require('./routes/product.routes');
const providerRoutes = require('./routes/provider.routes');

// CORS y body parsers
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas de tu API
app.use('/api/rentas', RentaRoutes);
app.use('/api/room', RoomsRoutes);
app.use('/api/usuarios', usuarioRoutes);

app.use('/api/roles', roles);
app.use('/api/permiso', permiso);
app.use('/api/comment', require('./routes/comment.routes'));

app.use('/api/solicitudes', solicitudRoutes);
app.use('/api/pagos', pagoRoutes);

app.use('/api/productos', productRoutes);
app.use('/api/proveedor', providerRoutes);

// ---- Docs ----
app.get('/openapi.json', (_, res) => res.json(openapi));

app.use('/api-explorer', apiReference({
  url: '/openapi.json',
}));

// 404 para rutas no encontradas
app.use((req, res) => {
  console.log(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ status: 'error', message: 'Ruta no encontrada' });
});

// Server
app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});