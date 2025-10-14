# Gestor de Bienes Municipales - Backend

Stack: Express + TypeScript + PostgreSQL + Prisma + JWT + Zod

## Descripción

Backend para el sistema de gestión de bienes municipales, con autenticación de usuarios, CRUD de bienes y manejo de inventario.

## Características Implementadas

- ✅ Autenticación JWT con roles (ADMIN/USER)
- ✅ CRUD completo para usuarios y bienes
- ✅ Base de datos PostgreSQL con Prisma ORM
- ✅ Validación de entrada con Zod
- ✅ Manejo de errores global
- ✅ Middlewares de autenticación y autorización
- ✅ Docker para desarrollo
- ✅ Configuración de pruebas con Jest

## Estructura del Proyecto

```
src/
├── app.ts                 # Configuración principal de Express
├── server.ts              # Punto de entrada del servidor
├── config/
│   └── database.ts        # Configuración de base de datos
├── controllers/           # Controladores de rutas
│   ├── userController.ts
│   └── bienController.ts
├── services/              # Lógica de negocio
│   ├── userService.ts
│   └── bienService.ts
├── routes/                # Definición de rutas
│   ├── userRoutes.ts
│   └── bienRoutes.ts
├── middlewares/           # Middlewares personalizados
│   ├── authMiddleware.ts
│   ├── roleMiddleware.ts
│   └── errorMiddleware.ts
├── types/                 # Definiciones de tipos
│   └── index.ts
├── validations/           # Esquemas de validación Zod
│   └── index.ts
tests/                     # Pruebas
├── services/
│   └── userService.test.ts
```

## Próximos Pasos Recomendados

### 1. Completar Pruebas
- [ ] Implementar pruebas para controladores de usuario
- [ ] Implementar pruebas para servicios de bienes
- [ ] Implementar pruebas para controladores de bienes
- [ ] Agregar pruebas de integración para rutas
- [ ] Configurar base de datos de pruebas con SQLite

### 2. Funcionalidades Adicionales
- [ ] Implementar transferencias de bienes entre unidades
- [ ] Agregar búsquedas avanzadas y filtros
- [ ] Implementar paginación en listados
- [ ] Agregar manejo de imágenes de bienes
- [ ] Implementar reportes y estadísticas

### 3. Mejoras de Arquitectura
- [ ] Agregar logging estructurado
- [ ] Implementar rate limiting
- [ ] Agregar validación de permisos más granular
- [ ] Implementar caché (Redis)
- [ ] Agregar documentación API con Swagger

### 4. DevOps y Calidad
- [ ] Configurar CI/CD básico
- [ ] Agregar linting (ESLint)
- [ ] Configurar pre-commit hooks
- [ ] Agregar monitoreo básico
- [ ] Configurar variables de entorno para diferentes entornos

## Instalación y Uso

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno (copiar `.env.example` a `.env`):
```bash
cp .env.example .env
```

3. Ejecutar migraciones de base de datos:
```bash
npm run prisma:migrate
```

4. Generar cliente Prisma:
```bash
npm run prisma:generate
```

5. Ejecutar en desarrollo:
```bash
npm run dev
```

6. Acceder a la documentación API:
   - Abrir en navegador: `http://localhost:3000/api-docs`
   - Endpoints disponibles con ejemplos interactivos

7. Ejecutar pruebas:
```bash
npm test
```

## API Endpoints

### Usuarios
- `POST /api/users/register` - Registrar usuario
- `POST /api/users/login` - Iniciar sesión
- `GET /api/users/profile` - Obtener perfil (requiere auth)
- `PUT /api/users/profile` - Actualizar perfil (requiere auth)
- `GET /api/users` - Listar usuarios (solo ADMIN)
- `DELETE /api/users/:id` - Eliminar usuario (solo ADMIN)

### Bienes
- `POST /api/bienes` - Crear bien (requiere auth)
- `GET /api/bienes/:inventario` - Obtener bien (requiere auth)
- `GET /api/bienes` - Listar bienes (requiere auth)
- `PUT /api/bienes/:inventario` - Actualizar bien (requiere auth)
- `DELETE /api/bienes/:inventario` - Eliminar bien (requiere auth)

## Tecnologías Utilizadas

- **Express.js**: Framework web
- **TypeScript**: Tipado estático
- **Prisma**: ORM para base de datos
- **PostgreSQL**: Base de datos
- **JWT**: Autenticación
- **bcrypt**: Hashing de contraseñas
- **Zod**: Validación de esquemas
- **Jest**: Framework de pruebas
- **Docker**: Contenedorización