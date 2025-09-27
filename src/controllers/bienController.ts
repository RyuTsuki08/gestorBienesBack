import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { IBienController, CreateBienRequest, BienResponse } from '../types';

const prisma = new PrismaClient();

export class BienController implements IBienController {
  async createBien(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateBienRequest = req.body;
      if (!data.inventario) {
        res.status(400).json({ error: 'Inventario es requerido' });
        return;
      }
      const bien = await prisma.bien.create({ data });
      const response: BienResponse = {
        inventario: bien.inventario,
        descripcion: bien.descripcion,
      };
      res.status(201).json(response);
    } catch (error: any) {
      if (error.code === 'P2002') {
        res.status(409).json({ error: 'Inventario ya existe' });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }

  async getBien(req: Request, res: Response): Promise<void> {
    try {
      const { inventario } = req.params;
      const bien = await prisma.bien.findUnique({ where: { inventario } });
      if (!bien) {
        res.status(404).json({ error: 'Bien no encontrado' });
        return;
      }
      const response: BienResponse = {
        inventario: bien.inventario,
        descripcion: bien.descripcion,
        // Agregar otros campos
      };
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async getAllBienes(req: Request, res: Response): Promise<void> {
    try {
      const bienes = await prisma.bien.findMany();
      const responses: BienResponse[] = bienes.map(b => ({
        inventario: b.inventario,
        descripcion: b.descripcion,
        // Agregar otros campos
      }));
      res.json(responses);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async updateBien(req: Request, res: Response): Promise<void> {
    try {
      const { inventario } = req.params;
      const data = req.body;
      const bien = await prisma.bien.update({
        where: { inventario },
        data,
      });
      const response: BienResponse = {
        inventario: bien.inventario,
        descripcion: bien.descripcion,
        // Agregar otros campos
      };
      res.json(response);
    } catch (error: any) {
      if (error.code === 'P2025') {
        res.status(404).json({ error: 'Bien no encontrado' });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }

  async deleteBien(req: Request, res: Response): Promise<void> {
    try {
      const { inventario } = req.params;
      await prisma.bien.delete({ where: { inventario } });
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