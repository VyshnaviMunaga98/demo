const swaggerJsDoc = require("swagger-jsdoc");

const options = {

  definition: {

    openapi: "3.0.0",

    info: {
      title: "Audit Review Demo APIs",
      version: "1.0.0",
      description: "API documentation for Audit Review Demo"
    },

    servers: [
      {
        url: "http://localhost:4000"
      }
    ]
  },

  apis: ["./src/routes/**/*.js"]
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;