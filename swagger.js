const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Media Library API',
    description: 'CRUD Operations with OAuth Authentication',
  },
  host: 'localhost:8080', 
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);