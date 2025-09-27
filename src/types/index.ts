// Enums
export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

// Interfaces para modelos (complemento a tipos generados por Prisma)
export interface IUser {
  id: number;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBien {
  inventario: string;
  descripcion?: string;
  idsubgrupo?: number;
  idseccion?: number;
  valor?: number;
  idunidaddetrabajo?: number;
  idambiente?: number;
  factura?: string;
  fechafactura?: Date;
  fechaincorporacion?: Date;
  desincorporado: boolean;
  robado: boolean;
  chatarra: boolean;
  fechadesincorporacion?: Date;
  vidautil?: number;
  valorDeRecuperacion?: number;
  valorDeDepreciacion?: number;
  faltante: boolean;
  esperafactura: boolean;
  inoperativo: boolean;
  otrosmemo?: string;
  fuerademural: boolean;
  observaciones?: string;
  codigop?: string;
  vehiculo: boolean;
  maquinaria: boolean;
  marcadorGrupal: boolean;
  mantenimiento: boolean;
  esrecolector: boolean;
  moto: boolean;
  inspeccion: boolean;
  fechainspeccion?: Date;
  iddependencias?: number;
  deteriorado: boolean;
  codigopresupuestario?: string;
  sc: boolean;
  valorsoberano?: number;
  obsoleto?: boolean;
  denuncia?: string;
  fechadenuncia?: Date;
  asignado?: string;
}

// Interfaces para servicios
export interface IUserService {
  createUser(data: CreateUserRequest): Promise<IUser>;
  findUserByEmail(email: string): Promise<IUser | null>;
  findUserById(id: number): Promise<IUser | null>;
  authenticateUser(email: string, password: string): Promise<IUser | null>;
  updateUser(id: number, data: Partial<UpdateUserRequest>): Promise<IUser>;
  deleteUser(id: number): Promise<void>;
  getAllUsers(): Promise<IUser[]>;
}

export interface IBienService {
  createBien(data: CreateBienRequest): Promise<IBien>;
  findBienByInventario(inventario: string): Promise<IBien | null>;
  getAllBienes(): Promise<IBien[]>;
  updateBien(inventario: string, data: Partial<UpdateBienRequest>): Promise<IBien>;
  deleteBien(inventario: string): Promise<void>;
  // Agregar métodos adicionales según necesidades (ej. búsqueda por unidad, etc.)
}

// Interfaces para controladores
export interface IUserController {
  register(req: any, res: any): Promise<void>;
  login(req: any, res: any): Promise<void>;
  getProfile(req: any, res: any): Promise<void>;
  updateProfile(req: any, res: any): Promise<void>;
  getAllUsers(req: any, res: any): Promise<void>;
  deleteUser(req: any, res: any): Promise<void>;
}

export interface IBienController {
  createBien(req: any, res: any): Promise<void>;
  getBien(req: any, res: any): Promise<void>;
  getAllBienes(req: any, res: any): Promise<void>;
  updateBien(req: any, res: any): Promise<void>;
  deleteBien(req: any, res: any): Promise<void>;
}

// Interfaces para requests/responses
export interface CreateUserRequest {
  email: string;
  password: string;
  role?: Role;
}

export interface UpdateUserRequest {
  email?: string;
  password?: string;
  role?: Role;
}

export interface UserResponse {
  id: number;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: UserResponse;
}

export interface CreateBienRequest {
  inventario: string;
  descripcion?: string;
  // Agregar otros campos opcionales según necesidades
}

export interface UpdateBienRequest {
  descripcion?: string;
  // Agregar otros campos
}

export interface BienResponse {
  inventario: string;
  descripcion?: string;
  // Incluir campos relevantes
}

// Interfaces para middlewares
export interface AuthRequest extends Request {
  user?: IUser;
}