import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { IUserService, CreateUserRequest, UpdateUserRequest, IUser, Role } from '../types';

const prisma = new PrismaClient();

export class UserService implements IUserService {
  async createUser(data: CreateUserRequest): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        role: data.role || Role.USER,
      },
    });
    return user;
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async findUserById(id: number): Promise<IUser | null> {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  async authenticateUser(email: string, password: string): Promise<IUser | null> {
    const user = await this.findUserByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async updateUser(id: number, data: Partial<UpdateUserRequest>): Promise<IUser> {
    const updateData: any = { ...data };
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }
    return await prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  async deleteUser(id: number): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }

  async getAllUsers(): Promise<IUser[]> {
    return await prisma.user.findMany();
  }
}