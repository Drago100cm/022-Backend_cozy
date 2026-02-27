// openapi.js

const swaggerJSDoc = require('swagger-jsdoc');// genera el documento OpenAPI leyendo comentarios en tus rutas

const m2s = require('mongoose-to-swagger');// convierte tus modelos de Mongoose a esquemas compatibles con OpenAPI

// Importa los modelos de Mongoose que quieres documentar
const Renta = require('./models/renta.model');
const Room = require('./models/room.model');
const Usuario = require('./models/usuario.model');



const Rol = require('./models/role.model');
const Permiso = require('./models/permisos.model');

// Convierte los modelos a esquema OpenAPI automáticamente
const RentaSchemaOpenAPI  = m2s(Renta);
const RoomsrSchemaOpenAPI = m2s(Room);
const UsuarioSchemaOpenAPI = m2s(Usuario);


const RolSchemaOpenAPI = m2s(Rol);
const PermisoSchemaOpenAPI = m2s(Permiso);

// Genera y exporta la configuración OpenAPI para usarla en Swagger UI u otros
module.exports = swaggerJSDoc({
  // Definición base del documento OpenAPI
  definition: {
    // Versión del estándar OpenAPI que se está usando
    openapi: '3.0.3',

    // Información básica de la API (lo que verás arriba en Swagger UI)
    info: {
      title: 'Rentas API', // Título de la documentación
      version: '1.0.0',       // Versión de la API
    },

    // Servidores donde vive tu API. Aquí apuntas al backend local
    servers: [
      { url: 'http://localhost:3000' }
    ],

    // Componentes reutilizables (schemas)
    components: {
      schemas: {
        Renta: RentaSchemaOpenAPI,
        Room: RoomsrSchemaOpenAPI,
        Usuario: UsuarioSchemaOpenAPI,
        Rol: RolSchemaOpenAPI,
        Permiso: PermisoSchemaOpenAPI,
      },
    },
  },

  // Archivos donde swagger-jsdoc va a buscar comentarios @openapi para armar las rutas
  apis: [
    './routes/Renta.routes.js',
    './routes/Room.routes.js',
    './routes/usuario.routes.js',
    './routes/rol.routes.js',
    './routes/permisos.routes.js',
  ],
});
