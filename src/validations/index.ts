import { z } from 'zod';

// Esquemas de validación para usuarios
export const createUserSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  role: z.enum(['ADMIN', 'USER']).optional().default('USER'),
});

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

export const updateUserSchema = z.object({
  email: z.string().email('Email inválido').optional(),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').optional(),
  role: z.enum(['ADMIN', 'USER']).optional(),
});

// Esquemas de validación para bienes
export const createBienSchema = z.object({
  inventario: z.string().min(1, 'Inventario es requerido'),
  descripcion: z.string().optional(),
  idsubgrupo: z.number().optional(),
  idseccion: z.number().optional(),
  valor: z.number().optional(),
  idunidaddetrabajo: z.number().optional(),
  idambiente: z.number().optional(),
  factura: z.string().optional(),
  fechafactura: z.string().datetime().optional(),
  fechaincorporacion: z.string().datetime().optional(),
  desincorporado: z.boolean().optional().default(false),
  robado: z.boolean().optional().default(false),
  chatarra: z.boolean().optional().default(false),
  fechadesincorporacion: z.string().datetime().optional(),
  vidautil: z.number().optional(),
  valorDeRecuperacion: z.number().optional(),
  valorDeDepreciacion: z.number().optional(),
  faltante: z.boolean().optional().default(false),
  esperafactura: z.boolean().optional().default(false),
  inoperativo: z.boolean().optional().default(false),
  otrosmemo: z.string().optional(),
  fuerademural: z.boolean().optional().default(false),
  observaciones: z.string().optional(),
  codigop: z.string().optional(),
  vehiculo: z.boolean().optional().default(false),
  maquinaria: z.boolean().optional().default(false),
  marcadorGrupal: z.boolean().optional().default(false),
  mantenimiento: z.boolean().optional().default(false),
  esrecolector: z.boolean().optional().default(false),
  moto: z.boolean().optional().default(false),
  inspeccion: z.boolean().optional().default(false),
  fechainspeccion: z.string().datetime().optional(),
  iddependencias: z.number().optional(),
  deteriorado: z.boolean().optional().default(false),
  codigopresupuestario: z.string().optional(),
  sc: z.boolean().optional().default(false),
  valorsoberano: z.number().optional(),
  obsoleto: z.boolean().optional(),
  denuncia: z.string().optional(),
  fechadenuncia: z.string().datetime().optional(),
  asignado: z.string().optional(),
});

export const updateBienSchema = z.object({
  descripcion: z.string().optional(),
  // Agregar otros campos opcionales
}).passthrough(); // Permitir campos adicionales

// Tipos inferidos
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type CreateBienInput = z.infer<typeof createBienSchema>;
export type UpdateBienInput = z.infer<typeof updateBienSchema>;