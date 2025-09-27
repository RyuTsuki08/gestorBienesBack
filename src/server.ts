import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Config DB dinámica
import { DATABASE_URL } from './config/database';
process.env.DATABASE_URL = DATABASE_URL;

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import app from './app';

// Ruta health con Prisma
app.get('/api/health', async (req, res) => {
  try {
    await prisma.$connect();
    res.json({
      status: 'OK',
      env: process.env.NODE_ENV,
      db: 'Conectado a DB'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Falla en Conexión DB' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
  