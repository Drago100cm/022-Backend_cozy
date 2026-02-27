//Importando o módulo swagger-autogen
const swaggerAutogen = require('swagger-autogen');

//Definir donde quedara plasmada la documentación
const outputFile = './swagger.json';

//Elegir endpoint que se van a documentar
const endpointsFiles = ['./index.js'];

//Configuracion de la documentación
const doc = {
    info: {
        title: "API de Ropas",
        description: "Documentación de la API de Ropas"
    },
    host: "localhost:3000",
    schemes: ['http']
};

swaggerAutogen()(outputFile, endpointsFiles, doc);