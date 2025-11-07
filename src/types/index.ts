// Enums
import { Role } from '@prisma/client';
export { Role };

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
  descripcion: string | null;
  idsubgrupo: number | null;
  idseccion: number | null;
  valor: number | null;
  idunidaddetrabajo: number | null;
  idambiente: number | null;
  factura: string | null;
  fechafactura: Date | null;
  fechaincorporacion: Date | null;
  desincorporado: boolean;
  robado: boolean;
  chatarra: boolean;
  fechadesincorporacion: Date | null;
  vidautil: number | null;
  valorDeRecuperacion: number | null;
  valorDeDepreciacion: number | null;
  faltante: boolean;
  esperafactura: boolean;
  inoperativo: boolean;
  otrosmemo: string | null;
  fuerademural: boolean;
  observaciones: string | null;
  codigop: string | null;
  vehiculo: boolean;
  maquinaria: boolean;
  marcadorGrupal: boolean;
  mantenimiento: boolean;
  esrecolector: boolean;
  moto: boolean;
  inspeccion: boolean;
  fechainspeccion: Date | null;
  iddependencias: number | null;
  deteriorado: boolean;
  codigopresupuestario: string | null;
  sc: boolean;
  valorsoberano: number | null;
  obsoleto: boolean | null;
  denuncia: string | null;
  fechadenuncia: Date | null;
  asignado: string | null;
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
  getAllBienesPaginated(page: number, limit: number): Promise<{ data: IBien[]; total: number }>;
  updateBien(inventario: string, data: Partial<UpdateBienRequest>): Promise<IBien>;
  deleteBien(inventario: string): Promise<void>;
  // Agregar métodos adicionales según necesidades (ej. búsqueda por unidad, etc.)
}

// Interfaces para controladores
export interface IUserController {
  register(req: any, res: any): Promise<void>;
  login(req: any, res: any): Promise<void>;
  refreshToken(req: any, res: any): Promise<void>;
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
  refreshToken: string;
  user: UserResponse;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
  user: UserResponse;
}

export interface CreateBienRequest {
  inventario: string;
  descripcion?: string;
  idsubgrupo?: number;
  idseccion?: number;
  valor?: number;
  idunidaddetrabajo?: number;
  idambiente?: number;
  factura?: string;
  fechafactura?: string;
  fechaincorporacion?: string;
  desincorporado?: boolean;
  robado?: boolean;
  chatarra?: boolean;
  fechadesincorporacion?: string;
  vidautil?: number;
  valorDeRecuperacion?: number;
  valorDeDepreciacion?: number;
  faltante?: boolean;
  esperafactura?: boolean;
  inoperativo?: boolean;
  otrosmemo?: string;
  fuerademural?: boolean;
  observaciones?: string;
  codigop?: string;
  vehiculo?: boolean;
  maquinaria?: boolean;
  marcadorGrupal?: boolean;
  mantenimiento?: boolean;
  esrecolector?: boolean;
  moto?: boolean;
  inspeccion?: boolean;
  fechainspeccion?: string;
  iddependencias?: number;
  deteriorado?: boolean;
  codigopresupuestario?: string;
  sc?: boolean;
  valorsoberano?: number;
  obsoleto?: boolean;
  denuncia?: string;
  fechadenuncia?: string;
  asignado?: string;
}

export interface UpdateBienRequest {
  descripcion?: string;
  idsubgrupo?: number;
  idseccion?: number;
  valor?: number;
  idunidaddetrabajo?: number;
  idambiente?: number;
  factura?: string;
  fechafactura?: string;
  fechaincorporacion?: string;
  desincorporado?: boolean;
  robado?: boolean;
  chatarra?: boolean;
  fechadesincorporacion?: string;
  vidautil?: number;
  valorDeRecuperacion?: number;
  valorDeDepreciacion?: number;
  faltante?: boolean;
  esperafactura?: boolean;
  inoperativo?: boolean;
  otrosmemo?: string;
  fuerademural?: boolean;
  observaciones?: string;
  codigop?: string;
  vehiculo?: boolean;
  maquinaria?: boolean;
  marcadorGrupal?: boolean;
  mantenimiento?: boolean;
  esrecolector?: boolean;
  moto?: boolean;
  inspeccion?: boolean;
  fechainspeccion?: string;
  iddependencias?: number;
  deteriorado?: boolean;
  codigopresupuestario?: string;
  sc?: boolean;
  valorsoberano?: number;
  obsoleto?: boolean;
  denuncia?: string;
  fechadenuncia?: string;
  asignado?: string;
  imagenes?: string[];
}

export interface BienResponse {
  inventario: string;
  descripcion: string | null;
  idsubgrupo: number | null;
  idseccion: number | null;
  valor: number | null;
  idunidaddetrabajo: number | null;
  idambiente: number | null;
  factura: string | null;
  fechafactura: Date | null;
  fechaincorporacion: Date | null;
  desincorporado: boolean;
  robado: boolean;
  chatarra: boolean;
  fechadesincorporacion: Date | null;
  vidautil: number | null;
  valorDeRecuperacion: number | null;
  valorDeDepreciacion: number | null;
  faltante: boolean;
  esperafactura: boolean;
  inoperativo: boolean;
  otrosmemo: string | null;
  fuerademural: boolean;
  observaciones: string | null;
  codigop: string | null;
  vehiculo: boolean;
  maquinaria: boolean;
  marcadorGrupal: boolean;
  mantenimiento: boolean;
  esrecolector: boolean;
  moto: boolean;
  inspeccion: boolean;
  fechainspeccion: Date | null;
  iddependencias: number | null;
  deteriorado: boolean;
  codigopresupuestario: string | null;
  sc: boolean;
  valorsoberano: number | null;
  obsoleto: boolean | null;
  denuncia: string | null;
  fechadenuncia: Date | null;
  asignado: string | null;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Interfaces para middlewares
export interface AuthRequest extends Request {
  user?: IUser;
}