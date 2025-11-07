import { Request, Response } from 'express';
import multer from 'multer';
import { BienService } from '../services/bienService';
import ImageService from '../services/imageService';
import { IBienController, CreateBienRequest, BienResponse, PaginationParams, PaginatedResponse } from '../types';
import { createBienSchema, updateBienSchema, CreateBienInput, UpdateBienInput } from '../validations';

const bienService = new BienService();
const imageService = new ImageService();

// Configuración de multer para subida de archivos
const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB límite
    files: 10 // Máximo 10 archivos
  },
  fileFilter: (req, file, cb) => {
    // Solo permitir imágenes
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos de imagen'));
    }
  }
});

export class BienController implements IBienController {
  async createBien(req: Request, res: Response): Promise<void> {
    try {
      const validatedData: CreateBienInput = createBienSchema.parse(req.body);
      const bien = await bienService.createBien(validatedData);
      const response: BienResponse = {
        inventario: bien.inventario,
        descripcion: bien.descripcion,
        idsubgrupo: bien.idsubgrupo,
        idseccion: bien.idseccion,
        valor: bien.valor,
        idunidaddetrabajo: bien.idunidaddetrabajo,
        idambiente: bien.idambiente,
        factura: bien.factura,
        fechafactura: bien.fechafactura,
        fechaincorporacion: bien.fechaincorporacion,
        desincorporado: bien.desincorporado,
        robado: bien.robado,
        chatarra: bien.chatarra,
        fechadesincorporacion: bien.fechadesincorporacion,
        vidautil: bien.vidautil,
        valorDeRecuperacion: bien.valorDeRecuperacion,
        valorDeDepreciacion: bien.valorDeDepreciacion,
        faltante: bien.faltante,
        esperafactura: bien.esperafactura,
        inoperativo: bien.inoperativo,
        otrosmemo: bien.otrosmemo,
        fuerademural: bien.fuerademural,
        observaciones: bien.observaciones,
        codigop: bien.codigop,
        vehiculo: bien.vehiculo,
        maquinaria: bien.maquinaria,
        marcadorGrupal: bien.marcadorGrupal,
        mantenimiento: bien.mantenimiento,
        esrecolector: bien.esrecolector,
        moto: bien.moto,
        inspeccion: bien.inspeccion,
        fechainspeccion: bien.fechainspeccion,
        iddependencias: bien.iddependencias,
        deteriorado: bien.deteriorado,
        codigopresupuestario: bien.codigopresupuestario,
        sc: bien.sc,
        valorsoberano: bien.valorsoberano,
        obsoleto: bien.obsoleto,
        denuncia: bien.denuncia,
        fechadenuncia: bien.fechadenuncia,
        asignado: bien.asignado,
      };
      res.status(201).json(response);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        res.status(400).json({ error: 'Datos inválidos', details: error.errors });
      } else if (error.code === 'P2002') {
        res.status(409).json({ error: 'Inventario ya existe' });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }

  async getBien(req: Request, res: Response): Promise<void> {
    try {
      const { inventario } = req.params;
      const bien = await bienService.findBienByInventario(inventario);
      if (!bien) {
        res.status(404).json({ error: 'Bien no encontrado' });
        return;
      }
      const response: BienResponse = {
        inventario: bien.inventario,
        descripcion: bien.descripcion,
        idsubgrupo: bien.idsubgrupo,
        idseccion: bien.idseccion,
        valor: bien.valor,
        idunidaddetrabajo: bien.idunidaddetrabajo,
        idambiente: bien.idambiente,
        factura: bien.factura,
        fechafactura: bien.fechafactura,
        fechaincorporacion: bien.fechaincorporacion,
        desincorporado: Boolean(bien.desincorporado),
        robado: Boolean(bien.robado),
        chatarra: Boolean(bien.chatarra),
        fechadesincorporacion: bien.fechadesincorporacion,
        vidautil: bien.vidautil,
        valorDeRecuperacion: bien.valorDeRecuperacion,
        valorDeDepreciacion: bien.valorDeDepreciacion,
        faltante: Boolean(bien.faltante),
        esperafactura: Boolean(bien.esperafactura),
        inoperativo: Boolean(bien.inoperativo),
        otrosmemo: bien.otrosmemo,
        fuerademural: Boolean(bien.fuerademural),
        observaciones: bien.observaciones,
        codigop: bien.codigop,
        vehiculo: Boolean(bien.vehiculo),
        maquinaria: Boolean(bien.maquinaria),
        marcadorGrupal: Boolean(bien.marcadorGrupal),
        mantenimiento: Boolean(bien.mantenimiento),
        esrecolector: Boolean(bien.esrecolector),
        moto: Boolean(bien.moto),
        inspeccion: Boolean(bien.inspeccion),
        fechainspeccion: bien.fechainspeccion,
        iddependencias: bien.iddependencias,
        deteriorado: Boolean(bien.deteriorado),
        codigopresupuestario: bien.codigopresupuestario,
        sc: Boolean(bien.sc),
        valorsoberano: bien.valorsoberano,
        obsoleto: bien.obsoleto === null ? null : Boolean(bien.obsoleto),
        denuncia: bien.denuncia,
        fechadenuncia: bien.fechadenuncia,
        asignado: bien.asignado,
      };
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async getAllBienes(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 50 } = req.query as PaginationParams;
      const pageNum = Math.max(1, parseInt(page.toString()) || 1);
      const limitNum = Math.min(1000, Math.max(1, parseInt(limit.toString()) || 50));

      const { data: bienes, total } = await bienService.getAllBienesPaginated(pageNum, limitNum);

      const responses: BienResponse[] = bienes.map(b => ({
        inventario: b.inventario,
        descripcion: b.descripcion,
        idsubgrupo: b.idsubgrupo,
        idseccion: b.idseccion,
        valor: b.valor,
        idunidaddetrabajo: b.idunidaddetrabajo,
        idambiente: b.idambiente,
        factura: b.factura,
        fechafactura: b.fechafactura,
        fechaincorporacion: b.fechaincorporacion,
        desincorporado: Boolean(b.desincorporado),
        robado: Boolean(b.robado),
        chatarra: Boolean(b.chatarra),
        fechadesincorporacion: b.fechadesincorporacion,
        vidautil: b.vidautil,
        valorDeRecuperacion: b.valorDeRecuperacion,
        valorDeDepreciacion: b.valorDeDepreciacion,
        faltante: Boolean(b.faltante),
        esperafactura: Boolean(b.esperafactura),
        inoperativo: Boolean(b.inoperativo),
        otrosmemo: b.otrosmemo,
        fuerademural: Boolean(b.fuerademural),
        observaciones: b.observaciones,
        codigop: b.codigop,
        vehiculo: Boolean(b.vehiculo),
        maquinaria: Boolean(b.maquinaria),
        marcadorGrupal: Boolean(b.marcadorGrupal),
        mantenimiento: Boolean(b.mantenimiento),
        esrecolector: Boolean(b.esrecolector),
        moto: Boolean(b.moto),
        inspeccion: Boolean(b.inspeccion),
        fechainspeccion: b.fechainspeccion,
        iddependencias: b.iddependencias,
        deteriorado: Boolean(b.deteriorado),
        codigopresupuestario: b.codigopresupuestario,
        sc: Boolean(b.sc),
        valorsoberano: b.valorsoberano,
        obsoleto: b.obsoleto === null ? null : Boolean(b.obsoleto),
        denuncia: b.denuncia,
        fechadenuncia: b.fechadenuncia,
        asignado: b.asignado,
      }));

      const totalPages = Math.ceil(total / limitNum);

      const paginatedResponse: PaginatedResponse<BienResponse> = {
        data: responses,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages,
        },
      };

      res.json(paginatedResponse);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async updateBien(req: Request, res: Response): Promise<void> {
    try {
      const { inventario } = req.params;
      console.log(`Actualizando bien ${inventario} con datos:`, req.body);
      console.log(`Archivos recibidos:`, req.files);

      // Procesar imágenes si se enviaron archivos
      let imagenesUrls: string[] = [];
      if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        console.log(`Subiendo ${req.files.length} imágenes para el bien ${inventario}`);
        imagenesUrls = await imageService.uploadMultipleImages(req.files, inventario);
        console.log('Imágenes subidas:', imagenesUrls);
      }

      // Combinar datos del body con las URLs de imágenes
      const updateData = {
        ...req.body,
        ...(imagenesUrls.length > 0 && { imagenes: imagenesUrls })
      };

      console.log(`Datos finales para actualizar:`, updateData);

      const validatedData: UpdateBienInput = updateBienSchema.parse(updateData);
      console.log(`Datos validados:`, validatedData);

      const bien = await bienService.updateBien(inventario, validatedData);
      console.log(`Bien actualizado exitosamente:`, bien.inventario);
      console.log(`Imágenes asociadas:`, imagenesUrls.length);

      const response: BienResponse = {
        inventario: bien.inventario,
        descripcion: bien.descripcion,
        idsubgrupo: bien.idsubgrupo,
        idseccion: bien.idseccion,
        valor: bien.valor,
        idunidaddetrabajo: bien.idunidaddetrabajo,
        idambiente: bien.idambiente,
        factura: bien.factura,
        fechafactura: bien.fechafactura,
        fechaincorporacion: bien.fechaincorporacion,
        desincorporado: Boolean(bien.desincorporado),
        robado: Boolean(bien.robado),
        chatarra: Boolean(bien.chatarra),
        fechadesincorporacion: bien.fechadesincorporacion,
        vidautil: bien.vidautil,
        valorDeRecuperacion: bien.valorDeRecuperacion,
        valorDeDepreciacion: bien.valorDeDepreciacion,
        faltante: Boolean(bien.faltante),
        esperafactura: Boolean(bien.esperafactura),
        inoperativo: Boolean(bien.inoperativo),
        otrosmemo: bien.otrosmemo,
        fuerademural: Boolean(bien.fuerademural),
        observaciones: bien.observaciones,
        codigop: bien.codigop,
        vehiculo: Boolean(bien.vehiculo),
        maquinaria: Boolean(bien.maquinaria),
        marcadorGrupal: Boolean(bien.marcadorGrupal),
        mantenimiento: Boolean(bien.mantenimiento),
        esrecolector: Boolean(bien.esrecolector),
        moto: Boolean(bien.moto),
        inspeccion: Boolean(bien.inspeccion),
        fechainspeccion: bien.fechainspeccion,
        iddependencias: bien.iddependencias,
        deteriorado: Boolean(bien.deteriorado),
        codigopresupuestario: bien.codigopresupuestario,
        sc: Boolean(bien.sc),
        valorsoberano: bien.valorsoberano,
        obsoleto: bien.obsoleto === null ? null : Boolean(bien.obsoleto),
        denuncia: bien.denuncia,
        fechadenuncia: bien.fechadenuncia,
        asignado: bien.asignado,
      };
      res.json(response);
    } catch (error: any) {
      console.error(`Error al actualizar bien ${req.params.inventario}:`, error);
      if (error.name === 'ZodError') {
        console.error('Errores de validación:', error.errors);
        res.status(400).json({ error: 'Datos inválidos', details: error.errors });
      } else if (error.code === 'P2025') {
        console.error('Bien no encontrado en base de datos');
        res.status(404).json({ error: 'Bien no encontrado' });
      } else {
        console.error('Error interno del servidor:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }

  // Método auxiliar para subir imágenes por separado
  async uploadImages(req: Request, res: Response): Promise<void> {
    try {
      const { inventario } = req.params;

      console.log(`=== UPLOAD IMAGES REQUEST ===`);
      console.log(`Inventario: ${inventario}`);
      console.log(`Headers:`, req.headers);
      console.log(`Body:`, req.body);
      console.log(`Files:`, req.files);
      console.log(`Raw files:`, req.files);

      if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        console.log('No se encontraron archivos - enviando error 400');
        res.status(400).json({ error: 'No se encontraron archivos' });
        return;
      }

      console.log(`Subiendo ${req.files.length} imágenes para el bien ${inventario}`);
      const imagenesUrls = await imageService.uploadMultipleImages(req.files, inventario);

      console.log(`Imágenes subidas exitosamente:`, imagenesUrls);

      // Actualizar el bien con las nuevas imágenes
      await bienService.updateBien(inventario, { imagenes: imagenesUrls });

      console.log(`Bien ${inventario} actualizado con ${imagenesUrls.length} imágenes`);

      const response = {
        message: 'Imágenes subidas exitosamente',
        imagenes: imagenesUrls,
        count: imagenesUrls.length
      };

      console.log(`Enviando respuesta:`, response);
      res.json(response);
    } catch (error: any) {
      console.error('Error al subir imágenes:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async deleteBien(req: Request, res: Response): Promise<void> {
    try {
      const { inventario } = req.params;
      await bienService.deleteBien(inventario);
      res.status(204).send();
    } catch (error: any) {
      if (error.code === 'P2025') {
        res.status(404).json({ error: 'Bien no encontrado' });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }
}