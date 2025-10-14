import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestión de Bienes Municipales',
      version: '1.0.0',
      description: 'API REST para la gestión de bienes municipales con autenticación JWT',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'usuario@example.com',
            },
            role: {
              type: 'string',
              enum: ['ADMIN', 'USER'],
              example: 'USER',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Bien: {
          type: 'object',
          properties: {
            inventario: {
              type: 'string',
              example: 'INV-001',
            },
            descripcion: {
              type: 'string',
              example: 'Computadora portátil',
            },
            valor: {
              type: 'number',
              example: 1500.00,
            },
            desincorporado: {
              type: 'boolean',
              example: false,
            },
            vehiculo: {
              type: 'boolean',
              example: false,
            },
            maquinaria: {
              type: 'boolean',
              example: false,
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              example: 'Mensaje de error',
            },
            details: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: {
                    type: 'string',
                  },
                  message: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'usuario@example.com',
            },
            password: {
              type: 'string',
              example: 'password123',
            },
          },
        },
        RegisterRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'usuario@example.com',
            },
            password: {
              type: 'string',
              minLength: 6,
              example: 'password123',
            },
            role: {
              type: 'string',
              enum: ['ADMIN', 'USER'],
              example: 'USER',
            },
          },
        },
        BienRequest: {
          type: 'object',
          required: ['inventario'],
          properties: {
            inventario: {
              type: 'string',
              example: 'INV-001',
            },
            descripcion: {
              type: 'string',
              example: 'Computadora portátil',
            },
            valor: {
              type: 'number',
              example: 1500.00,
            },
            idunidaddetrabajo: {
              type: 'integer',
              example: 1,
            },
            vehiculo: {
              type: 'boolean',
              example: false,
            },
            maquinaria: {
              type: 'boolean',
              example: false,
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Rutas donde buscar las anotaciones
};

const specs = swaggerJSDoc(options);

export { swaggerUi, specs };