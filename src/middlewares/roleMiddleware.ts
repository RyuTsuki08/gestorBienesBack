import { Request, Response, NextFunction } from 'express';
import { Role } from '../types';

export const roleMiddleware = (requiredRole: Role) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as any).user;
    if (!user) {
      res.status(401).json({ error: 'No autorizado' });
      return;
    }
    if (user.role !== requiredRole) {
      res.status(403).json({ error: 'Acceso denegado' });
      return;
    }
    next();
  };
};