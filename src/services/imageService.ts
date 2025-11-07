import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { supabaseConfig } from '../config/database';

class ImageService {
  private supabase: SupabaseClient;

  constructor() {
    console.log('Configuración de Supabase:', {
      url: supabaseConfig.url,
      anonKey: supabaseConfig.anonKey?.substring(0, 20) + '...', // Solo mostrar primeros 20 chars por seguridad
      hasAnonKey: !!supabaseConfig.anonKey
    });
    this.supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey);
  }

  async uploadImage(file: Express.Multer.File, inventario: string): Promise<string> {
    try {
      // Generar nombre único para el archivo
      const fileExt = file.originalname.split('.').pop();
      const fileName = `${inventario}_${Date.now()}.${fileExt}`;
      const filePath = `bienes/${fileName}`;

      console.log('Intentando subir archivo:', filePath);
      console.log('Tamaño del archivo:', file.size);
      console.log('Tipo MIME:', file.mimetype);

      // Verificar conexión primero
      console.log('Verificando conexión con Supabase...');
      const { data: listData, error: listError } = await this.supabase.storage
        .from('images')
        .list('', { limit: 1 });

      if (listError) {
        console.error('Error de conexión con Supabase:', listError);
        throw new Error(`Error de conexión con Supabase: ${listError.message}`);
      }

      console.log('Conexión exitosa, subiendo archivo...');

      // Subir archivo a Supabase Storage
      const { data, error } = await this.supabase.storage
        .from('images') // Asegúrate de que este bucket existe en Supabase
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: false
        });

      if (error) {
        console.error('Error de Supabase:', error);
        throw new Error(`Error al subir imagen: ${error.message}`);
      }

      console.log('Archivo subido exitosamente:', data);

      // Obtener URL pública del archivo
      const { data: { publicUrl } } = this.supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      console.log('URL pública generada:', publicUrl);
      return publicUrl;
    } catch (error) {
      console.error('Error en uploadImage:', error);
      throw error;
    }
  }

  async deleteImage(imageUrl: string): Promise<void> {
    try {
      // Extraer el path del archivo de la URL
      const urlParts = imageUrl.split('/storage/v1/object/public/images/');
      if (urlParts.length < 2) {
        throw new Error('URL de imagen inválida');
      }

      const filePath = urlParts[1];

      const { error } = await this.supabase.storage
        .from('images')
        .remove([filePath]);

      if (error) {
        throw new Error(`Error al eliminar imagen: ${error.message}`);
      }
    } catch (error) {
      console.error('Error en deleteImage:', error);
      throw error;
    }
  }

  async uploadMultipleImages(files: Express.Multer.File[], inventario: string): Promise<string[]> {
    const uploadPromises = files.map(file => this.uploadImage(file, inventario));
    return await Promise.all(uploadPromises);
  }
}

export default ImageService;