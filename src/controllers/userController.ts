import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/userService';
import { IUserController, CreateUserRequest, LoginRequest, UserResponse, LoginResponse } from '../types';

const userService = new UserService();
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret'; // Configurar en .env

export class UserController implements IUserController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, role }: CreateUserRequest = req.body;
      if (!email || !password) {
        res.status(400).json({ error: 'Email y password son requeridos' });
        return;
      }
      const user = await userService.createUser({ email, password, role });
      const userResponse: UserResponse = {
        id: user.id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
      res.status(201).json(userResponse);
    } catch (error: any) {
      if (error.code === 'P2002') {
        res.status(409).json({ error: 'Email ya existe' });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password }: LoginRequest = req.body;
      if (!email || !password) {
        res.status(400).json({ error: 'Email y password son requeridos' });
        return;
      }
      const user = await userService.authenticateUser(email, password);
      if (!user) {
        res.status(401).json({ error: 'Credenciales inválidas' });
        return;
      }
      const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
      const userResponse: UserResponse = {
        id: user.id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
      const response: LoginResponse = { token, user: userResponse };
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const user = (req as any).user; // Asumiendo middleware de auth
      if (!user) {
        res.status(401).json({ error: 'No autorizado' });
        return;
      }
      const userResponse: UserResponse = {
        id: user.id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
      res.json(userResponse);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const user = (req as any).user;
      if (!user) {
        res.status(401).json({ error: 'No autorizado' });
        return;
      }
      const updatedUser = await userService.updateUser(user.id, req.body);
      const userResponse: UserResponse = {
        id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      };
      res.json(userResponse);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const user = (req as any).user;
      if (!user || user.role !== 'ADMIN') {
        res.status(403).json({ error: 'Acceso denegado' });
        return;
      }
      const users = await userService.getAllUsers();
      const usersResponse: UserResponse[] = users.map(u => ({
        id: u.id,
        email: u.email,
        role: u.role,
        createdAt: u.createdAt,
        updatedAt: u.updatedAt,
      }));
      res.json(usersResponse);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const user = (req as any).user;
      if (!user || user.role !== 'ADMIN') {
        res.status(403).json({ error: 'Acceso denegado' });
        return;
      }
      const { id } = req.params;
      await userService.deleteUser(Number(id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}