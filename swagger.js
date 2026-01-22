const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Media Library API',
    description: 'Part 1: CRUD Operations for Movies and Directors',
  },
  host: 'https://cse341-media-library.onrender.com',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);