import express from 'express';
import userRoutes from './routes/userRoutes';
import bienRoutes from './routes/bienRoutes';

const app = express();

// Middlewares globales
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/bienes', bienRoutes);

// Ruta de prueba
app.get('/', (req, res) => res.json({ message: 'API de Gestión de Bienes Municipales' }));

export default app;