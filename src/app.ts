import express from 'express';
import userRoutes from './routes/userRoutes';
import bienRoutes from './routes/bienRoutes';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { swaggerUi, specs } from './config/swagger';

const app = express();

// Middlewares globales
app.use(express.json());

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