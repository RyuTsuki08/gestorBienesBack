  import dotenv from 'dotenv';
  dotenv.config({ path: '.env' });  // Carga .env.local

  const isLocal = process.env.NODE_ENV === 'local';

  let DATABASE_URL: string;

  if (isLocal) {
    // Local: Usa PG Docker
    DATABASE_URL = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  } else {
    // Development: Supabase
    DATABASE_URL = process.env.SUPABASE_URL || '';  // Tu URL de Supabase
    if (!DATABASE_URL.includes('?')) {
      DATABASE_URL += '?sslmode=require';  // Para Supabase
    }
  }

  // Exporta para usar en schema o directamente
  export { DATABASE_URL };

  export const config = {
    databaseUrl: DATABASE_URL,
    // Otras configuraciones si es necesario
  };
  console.log('Configuración de base de datos lista:', { isLocal, DATABASE_URL });

  // Configuración de Supabase para storage
  export const supabaseConfig = {
    url: process.env.SUPABASE_URL || '',
    anonKey: process.env.SUPABASE_ANON_KEY || '',
  };

  
export default config;

