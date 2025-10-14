import { Request, Response } from 'express';
import { BienService } from '../services/bienService';
import { IBienController, CreateBienRequest, BienResponse } from '../types';
import { createBienSchema, updateBienSchema, CreateBienInput, UpdateBienInput } from '../validations';

const bienService = new BienService();

export class BienController implements IBienController {
  async createBien(req: Request, res: Response): Promise<void> {
    try {
      const validatedData: CreateBienInput = createBienSchema.parse(req.body);
      const bien = await bienService.createBien(validatedData);
      const response: BienResponse = {
        inventario: bien.inventario,
        descripcion: bien.descripcion,
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
        // Agregar otros campos
      };
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async getAllBienes(req: Request, res: Response): Promise<void> {
    try {
      const bienes = await bienService.getAllBienes();
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
      const validatedData: UpdateBienInput = updateBienSchema.parse(req.body);
      const bien = await bienService.updateBien(inventario, validatedData);
      const response: BienResponse = {
        inventario: bien.inventario,
        descripcion: bien.descripcion,
        // Agregar otros campos
      };
      res.json(response);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        res.status(400).json({ error: 'Datos inválidos', details: error.errors });
      } else if (error.code === 'P2025') {
        res.status(404).json({ error: 'Bien no encontrado' });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
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