# 🥓 Picadas Backend - Plan de Desarrollo

## 📖 Descripción del Proyecto

API backend para un e-commerce de picadas desarrollado con NestJS, Prisma y MySQL. Incluye gestión de productos, usuarios, autenticación y sistema de pagos con Ualá.

## 🏗️ Arquitectura Técnica

- **Framework**: NestJS (Node.js)
- **Base de Datos**: MySQL con Prisma ORM
- **Autenticación**: bcryptjs (preparado para JWT)
- **Pagos**: Integración con API de Ualá
- **Validaciones**: class-validator + class-transformer

## 🚀 Quick Start

```bash
# Instalación
npm install

# Variables de entorno
cp .env.example .env

# Base de datos
npx prisma migrate dev
npx prisma db seed

# Desarrollo
npm run start:dev
```

## 📋 Plan de Desarrollo por Fases

### 🔴 **FASE 1: Correcciones Críticas** (Estimado: 1-2 días)

#### Issues Críticos a Resolver
- [ ] **Nomenclatura inconsistente**: Cambiar `ProductosService` → `ProductsService`
- [ ] **Validaciones faltantes**: Agregar decoradores a `CreateUserDto`
- [ ] **Tipos inseguros**: Remover `any` types en `products.service.ts:21`
- [ ] **Código innecesario**: Eliminar método `servicex2`
- [ ] **Schema inconsistente**: Sincronizar `CreateProductDto` con Prisma schema

#### Comandos de Validación
```bash
npm run lint --fix     # Corregir errores de ESLint
npm run build         # Verificar compilación TypeScript
npm audit fix         # Corregir vulnerabilidades
```

### 🟡 **FASE 2: Funcionalidades Core** (Estimado: 3-5 días)

#### Autenticación Completa
- [ ] Implementar JWT tokens
- [ ] Guards de autenticación
- [ ] Roles y permisos (admin/user)
- [ ] Refresh tokens
- [ ] Password reset

#### Gestión de Productos Avanzada
- [ ] Filtros y búsqueda
- [ ] Paginación
- [ ] Categorías anidadas
- [ ] Stock management
- [ ] Imágenes múltiples con validación

#### APIs Mejoradas
```typescript
// Ejemplo de endpoints a implementar
GET    /products?category=&search=&page=&limit=
GET    /products/:id/stock
POST   /products/:id/reserve
DELETE /products/:id/unreserve
```

### 🟠 **FASE 3: Testing & Calidad** (Estimado: 2-3 días)

#### Testing Strategy
- [ ] **Unit Tests**: Servicios individuales (>80% coverage)
- [ ] **Integration Tests**: Controllers con base de datos
- [ ] **E2E Tests**: Flujos completos de usuario
- [ ] **Performance Tests**: Load testing con Artillery

#### Estructura de Tests
```
src/
├── products/
│   ├── products.service.spec.ts
│   ├── products.controller.spec.ts
│   └── products.e2e-spec.ts
├── auth/
│   └── auth.service.spec.ts
└── users/
    └── users.service.spec.ts
```

### 🟢 **FASE 4: Seguridad & Producción** (Estimado: 2-3 días)

#### Seguridad
- [ ] **Rate Limiting**: Implementar con @nestjs/throttler
- [ ] **Input Sanitization**: Validación robusta de datos
- [ ] **CORS Configurado**: Configuración específica por ambiente
- [ ] **Helmet**: Security headers
- [ ] **Webhook Security**: Verificación de firmas Ualá

#### Monitoring & Logging
- [ ] **Structured Logging**: Winston + formato JSON
- [ ] **Health Checks**: Endpoint `/health`
- [ ] **Metrics**: Prometheus metrics
- [ ] **Error Tracking**: Sentry integration

### 🚀 **FASE 5: Features Avanzadas** (Estimado: 1-2 semanas)

#### Carrito de Compras
- [ ] Sesiones de carrito
- [ ] Persistencia para usuarios logueados
- [ ] Cálculo de totales con descuentos
- [ ] Integración con stock

#### Sistema de Órdenes
- [ ] Gestión completa de órdenes
- [ ] Estados de orden (pending, paid, shipped, delivered)
- [ ] Tracking de órdenes
- [ ] Notificaciones email

#### Features de E-commerce
- [ ] **Wishlist**: Lista de deseos
- [ ] **Reviews**: Sistema de reseñas
- [ ] **Recommendations**: Productos relacionados
- [ ] **Inventory**: Control de stock avanzado
- [ ] **Coupons**: Sistema de cupones de descuento

## 🛠️ Configuración de Desarrollo

### Variables de Entorno Necesarias
```env
DATABASE_URL="mysql://user:password@localhost:3306/picadas_db"
JWT_SECRET="tu-jwt-secret-super-seguro"
UALA_AUTH_URL="https://api.uala.com.ar/auth"
UALA_ORDER_URL="https://api.uala.com.ar/orders"
USERNAME_UALA="tu-username"
CLIENT_ID_UALA="tu-client-id"
CLIENT_SECRET_UALA="tu-client-secret"
PORT=3000
NODE_ENV="development"
```

### Scripts Disponibles
```bash
npm run start:dev      # Desarrollo con hot reload
npm run build         # Build para producción
npm run start:prod    # Iniciar en producción
npm run lint          # Linter ESLint
npm run test          # Tests unitarios
npm run test:e2e      # Tests end-to-end
npm run test:cov      # Coverage de tests
```

## 📊 Endpoints API

### Productos
```
GET    /productos           # Listar todos
GET    /productos/:id       # Obtener por ID
POST   /productos           # Crear producto (auth required)
PUT    /productos/:id       # Actualizar (auth required)
DELETE /productos/:id       # Eliminar (auth required)
```

### Usuarios & Auth
```
POST   /users               # Registro
GET    /users               # Listar usuarios (admin only)
POST   /auth/login          # Login
POST   /auth/refresh        # Refresh token
POST   /auth/logout         # Logout
```

### Pagos
```
POST   /payment/checkout    # Crear orden de pago
POST   /payment/webhook     # Webhook de Ualá
GET    /payment/status/:id  # Estado de pago
```

## 🗄️ Base de Datos

### Modelos Existentes
- **User**: Usuarios del sistema
- **Product**: Catálogo de productos

### Modelos a Implementar
- **Order**: Órdenes de compra
- **OrderItem**: Items de cada orden
- **Cart**: Carrito de compras
- **CartItem**: Items del carrito
- **Category**: Categorías de productos
- **Review**: Reseñas de productos

### Migraciones Pendientes
```bash
npx prisma migrate dev --name add_orders_table
npx prisma migrate dev --name add_cart_system
npx prisma migrate dev --name add_categories
```

## 🚀 Deployment

### Staging Environment
- **Platform**: Railway/Vercel/DigitalOcean
- **Database**: PlanetScale/Railway MySQL
- **Monitoring**: Uptime monitoring + logs

### Production Checklist
- [ ] Environment variables configuradas
- [ ] Base de datos con backups automáticos
- [ ] SSL/HTTPS habilitado
- [ ] Monitoring y alertas configurados
- [ ] CI/CD pipeline funcionando
- [ ] Performance optimizado
- [ ] Security headers configurados

## 🤝 Contribución

### Flujo de Desarrollo
1. Fork del repositorio
2. Crear branch feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit con mensaje descriptivo
4. Push al branch: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

### Estándares de Código
- **ESLint**: Configuración TypeScript estricta
- **Prettier**: Formateo automático de código
- **Conventional Commits**: Formato de commits semántico
- **Tests**: Obligatorios para nuevas features

## 📞 Contacto & Soporte

- **Desarrollador**: Alexis Pérez
- **Email**: [tu-email@example.com]
- **Issues**: GitHub Issues para reportar bugs
- **Documentación**: Wiki del repositorio

---

### 🏆 Objetivos del Proyecto

1. **Corto Plazo** (1 mes): API funcional y estable
2. **Mediano Plazo** (3 meses): E-commerce completo con features avanzadas
3. **Largo Plazo** (6 meses): Plataforma escalable con analytics y optimizaciones

**Estado Actual**: 🟡 En desarrollo - Fase 1 pendiente