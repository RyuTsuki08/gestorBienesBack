  import express from 'express';
  import dotenv from 'dotenv';
  dotenv.config({ path: '.env.local' });

  // Config DB dinámica (de respuestas previas)
  import { DATABASE_URL } from './config/database';
  process.env.DATABASE_URL = DATABASE_URL;

  import { PrismaClient } from '@prisma/client';
  const prisma = new PrismaClient();  // O usa el singleton de config/database.ts

  const app = express();
  app.use(express.json());

  // Ruta base de prueba
  app.get('/', (req, res) => res.json({ message: '¡App Corriendo en Modo Local/Dev!  '  }));

    // Ruta health con Prisma
    app.get('/api/health', async (req, res) => {
        try {
        await prisma.$connect();
        res.json({ 
            status: 'OK', 
            env: process.env.NODE_ENV, 
            db: 'Conectado a Supabase' 
        });
        } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Falla en Conexión DB' });
        } finally {
        // await prisma.$disconnect();  // Opcional en dev
        }
    });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
  });
  