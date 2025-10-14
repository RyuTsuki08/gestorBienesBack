import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', error);

  // Errores de Prisma
  if (error.code) {
    switch (error.code) {
      case 'P2002':
        res.status(409).json({ error: 'Conflicto: dato duplicado' });
        return;
      case 'P2025':
        res.status(404).json({ error: 'Recurso no encontrado' });
        return;
      default:
        res.status(500).json({ error: 'Error de base de datos' });
        return;
    }
  }

  // Errores de validación Zod
  if (error.name === 'ZodError') {
    res.status(400).json({
      error: 'Datos inválidos',
      details: error.errors.map((e: any) => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    });
    return;
  }

  // Errores de JWT
  if (error.name === 'JsonWebTokenError') {
    res.status(401).json({ error: 'Token inválido' });
    return;
  }

  if (error.name === 'TokenExpiredError') {
    res.status(401).json({ error: 'Token expirado' });
    return;
  }

  // Error genérico
  res.status(500).json({ error: 'Error interno del servidor' });
};