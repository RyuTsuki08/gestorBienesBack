import { PrismaClient } from '@prisma/client';
import { IBienService, CreateBienRequest, UpdateBienRequest, IBien } from '../types';

const prisma = new PrismaClient();

export class BienService implements IBienService {
  async createBien(data: CreateBienRequest): Promise<IBien> {
    // Filtrar campos undefined para evitar problemas con Prisma
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined)
    );
    return await prisma.bien.create({ data: filteredData as any });
  }

  async findBienByInventario(inventario: string): Promise<IBien | null> {
    return await prisma.bien.findUnique({ where: { inventario } });
  }

  async getAllBienes(): Promise<IBien[]> {
    return await prisma.bien.findMany();
  }

  async getAllBienesPaginated(page: number, limit: number): Promise<{ data: IBien[]; total: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      prisma.bien.findMany({
        skip,
        take: limit,
        orderBy: { inventario: 'asc' }
      }),
      prisma.bien.count()
    ]);
    return { data, total };
  }

  async updateBien(inventario: string, data: Partial<UpdateBienRequest>): Promise<IBien> {
    const { imagenes, ...updateData } = data;

    // Si se incluyen imágenes, manejar la relación
    if (imagenes !== undefined) {
      console.log(`Procesando ${imagenes.length} imágenes para el bien ${inventario}`);

      // Primero eliminar imágenes existentes
      await prisma.imagen.deleteMany({
        where: { inventario }
      });

      // Crear nuevas imágenes si se proporcionaron
      if (imagenes && imagenes.length > 0) {
        console.log('Creando nuevas imágenes:', imagenes);

        // Crear imágenes una por una para mejor manejo de errores
        for (const url of imagenes) {
          try {
            await prisma.imagen.create({
              data: {
                inventario,
                url
              }
            });
            console.log(`Imagen creada: ${url}`);
          } catch (error) {
            console.error(`Error creando imagen ${url}:`, error);
            throw error;
          }
        }
      }
    }

    return await prisma.bien.update({
      where: { inventario },
      data: updateData,
    });
  }

  async deleteBien(inventario: string): Promise<void> {
    await prisma.bien.delete({ where: { inventario } });
  }

  // Métodos adicionales para búsquedas avanzadas
  async getBienesByUnidad(unidadId: number): Promise<IBien[]> {
    return await prisma.bien.findMany({
      where: { idunidaddetrabajo: unidadId },
    });
  }

  async getBienesDesincorporados(): Promise<IBien[]> {
    return await prisma.bien.findMany({
      where: { desincorporado: true },
    });
  }

  async searchBienes(query: string): Promise<IBien[]> {
    return await prisma.bien.findMany({
      where: {
        OR: [
          { descripcion: { contains: query } },
          { inventario: { contains: query } },
        ],
      },
    });
  }
}