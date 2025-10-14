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

  async updateBien(inventario: string, data: Partial<UpdateBienRequest>): Promise<IBien> {
    return await prisma.bien.update({
      where: { inventario },
      data,
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