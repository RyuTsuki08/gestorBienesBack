// Mock dependencies before importing
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
    },
  })),
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

// Import after mocking
import { UserService } from '../../src/services/userService';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const mockPrisma = new PrismaClient() as jest.Mocked<PrismaClient>;
const mockBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    jest.clearAllMocks();
    userService = new UserService();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createUser', () => {
    it('should create a new user with hashed password', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        role: 'USER' as const,
      };

      const hashedPassword = 'hashed_password';
      const createdUser = {
        id: 1,
        email: userData.email,
        password: hashedPassword,
        role: userData.role,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockBcrypt.hash.mockResolvedValue(hashedPassword);
      mockPrisma.user.create.mockResolvedValue(createdUser);

      const result = await userService.createUser(userData);

      expect(mockBcrypt.hash).toHaveBeenCalledWith(userData.password, 10);
      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: {
          email: userData.email,
          password: hashedPassword,
          role: userData.role || 'USER',
        },
      });
      expect(result).toEqual(createdUser);
    });

    it('should use default role USER when not provided', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
      };

      const hashedPassword = 'hashed_password';
      const createdUser = {
        id: 1,
        email: userData.email,
        password: hashedPassword,
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockBcrypt.hash.mockResolvedValue(hashedPassword);
      mockPrisma.user.create.mockResolvedValue(createdUser);

      await userService.createUser(userData);

      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: {
          email: userData.email,
          password: hashedPassword,
          role: 'USER',
        },
      });
    });
  });

  describe('findUserByEmail', () => {
    it('should find user by email', async () => {
      const email = 'test@example.com';
      const user = {
        id: 1,
        email,
        password: 'hashed_password',
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrisma.user.findUnique.mockResolvedValue(user);

      const result = await userService.findUserByEmail(email);

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { email },
      });
      expect(result).toEqual(user);
    });

    it('should return null if user not found', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      const result = await userService.findUserByEmail('nonexistent@example.com');

      expect(result).toBeNull();
    });
  });

  describe('authenticateUser', () => {
    it('should authenticate user with correct credentials', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const hashedPassword = 'hashed_password';
      const user = {
        id: 1,
        email,
        password: hashedPassword,
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrisma.user.findUnique.mockResolvedValue(user);
      mockBcrypt.compare.mockResolvedValue(true);

      const result = await userService.authenticateUser(email, password);

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { email },
      });
      expect(mockBcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
      expect(result).toEqual(user);
    });

    it('should return null with incorrect password', async () => {
      const email = 'test@example.com';
      const password = 'wrongpassword';
      const hashedPassword = 'hashed_password';
      const user = {
        id: 1,
        email,
        password: hashedPassword,
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrisma.user.findUnique.mockResolvedValue(user);
      mockBcrypt.compare.mockResolvedValue(false);

      const result = await userService.authenticateUser(email, password);

      expect(result).toBeNull();
    });

    it('should return null if user not found', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      const result = await userService.authenticateUser('nonexistent@example.com', 'password');

      expect(result).toBeNull();
    });
  });
});