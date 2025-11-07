import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import bienRoutes from './routes/bienRoutes';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { swaggerUi, specs } from './config/swagger';

const app = express();

// Configuración CORS
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'], // Permitir frontend en 3001
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Middlewares globales
app.use(express.json());

// Middleware de logging de requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);

  // Capturar la respuesta original
  const originalSend = res.send;
  const originalJson = res.json;

  res.send = function(data) {
    const status = res.statusCode >= 400 ? 'ERROR' : 'OK';
    console.log(`${new Date().toISOString()} - Response: ${res.statusCode} [${status}] - ${req.method} ${req.path}`);
    return originalSend.call(this, data);
  };

  res.json = function(data) {
    const status = res.statusCode >= 400 ? 'ERROR' : 'OK';
    console.log(`${new Date().toISOString()} - Response: ${res.statusCode} [${status}] - ${req.method} ${req.path}`);
    if (res.statusCode >= 400 && data) {
      console.log('Error details:', JSON.stringify(data, null, 2));
    }
    return originalJson.call(this, data);
  };

  next();
});

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/bienes', bienRoutes);

// Ruta de prueba
app.get('/', (req, res) => res.json({
  message: 'API de Gestión de Bienes Municipales',
  docs: '/api-docs',
  health: '/api/health'
}));

// Middleware de manejo de errores (debe ir al final)
app.use(errorMiddleware);

export default app;