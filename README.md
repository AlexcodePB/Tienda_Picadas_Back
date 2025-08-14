# 🥓 Picadas Backend API

API REST para e-commerce de picadas desarrollada con NestJS, Prisma y MySQL.

## 🚀 Instalación y Configuración

### Prerrequisitos
- **Node.js** >= 18
- **MySQL** >= 8.0
- **npm** o **yarn**

### 1. Clonar el repositorio
```bash
git clone https://github.com/AlexcodePB/Tienda_Picadas_Back.git
cd Tienda_Picadas_Back
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crear archivo `.env` en la raíz del proyecto:

```env
# Database
DATABASE_URL="mysql://usuario:password@localhost:3306/picadas_db"

# Server
PORT=3000
NODE_ENV=development

# Ualá Payment Integration
UALA_AUTH_URL="https://api.uala.com.ar/auth"
UALA_ORDER_URL="https://api.uala.com.ar/orders"
USERNAME_UALA="tu-username"
CLIENT_ID_UALA="tu-client-id"
CLIENT_SECRET_UALA="tu-client-secret"
```

### 4. Configurar base de datos
```bash
# Ejecutar migraciones
npx prisma migrate dev

# Ejecutar seed (opcional)
npx prisma db seed
```

### 5. Iniciar servidor
```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

El servidor estará disponible en: `http://localhost:3000`

## 📚 Documentación de API

### 🛍️ Productos
```
GET    /productos           # Listar todos los productos
GET    /productos/:id       # Obtener producto por ID
POST   /productos           # Crear nuevo producto
PUT    /productos/:id       # Actualizar producto
DELETE /productos/:id       # Eliminar producto
```

**Ejemplo de producto:**
```json
{
  "name": "Picada Clásica",
  "price": 2500,
  "ingredients": "Jamón, queso, salame, aceitunas",
  "image": "https://ejemplo.com/imagen.jpg",
  "url": "picada-clasica",
  "category": "tradicional"
}
```

### 👥 Usuarios
```
POST   /users               # Registrar nuevo usuario
GET    /users               # Listar usuarios
```

**Ejemplo de usuario:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "password": "123456"
}
```

### 🔐 Autenticación
```
POST   /auth/login          # Iniciar sesión
```

**Login:**
```json
{
  "email": "juan@ejemplo.com",
  "password": "123456"
}
```

### 💳 Pagos (Ualá)
```
POST   /payment/checkout    # Crear orden de pago
POST   /payment/webhook     # Webhook de Ualá (interno)
```

**Crear pago:**
```json
{
  "amount": 2500,
  "email": "cliente@ejemplo.com",
  "id": "orden-123",
  "description": "Compra de picadas"
}
```

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run start:dev      # Servidor con hot reload
npm run start:debug    # Servidor con debug

# Build y Producción
npm run build          # Compilar proyecto
npm run start:prod     # Iniciar en producción

# Testing
npm run test          # Tests unitarios
npm run test:e2e      # Tests end-to-end
npm run test:cov      # Coverage de tests

# Calidad de Código
npm run lint          # ESLint
npm run format        # Prettier

# Base de Datos
npx prisma migrate dev     # Aplicar migraciones
npx prisma db seed        # Cargar datos de prueba
npx prisma studio         # Abrir Prisma Studio
```

## 🏗️ Arquitectura

```
src/
├── auth/           # Módulo de autenticación
├── users/          # Gestión de usuarios
├── products/       # Gestión de productos
├── payment/        # Sistema de pagos Ualá
├── prisma/         # Configuración Prisma
└── main.ts         # Punto de entrada
```

## 🔧 Stack Tecnológico

- **Framework**: NestJS
- **Base de Datos**: MySQL + Prisma ORM
- **Validación**: class-validator + class-transformer
- **Autenticación**: bcryptjs (preparado para JWT)
- **Pagos**: Integración con Ualá API
- **Testing**: Jest + Supertest

## 🚀 Deploy

### Variables de Entorno para Producción
```env
NODE_ENV=production
PORT=3000
DATABASE_URL="mysql://user:pass@host:port/db"
# ... resto de variables
```

### Comandos de Deploy
```bash
npm run build
npm run start:prod
```

## 🐛 Troubleshooting

### Error de conexión a base de datos
```bash
# Verificar que MySQL esté corriendo
mysql -u root -p

# Verificar URL de conexión en .env
echo $DATABASE_URL
```

### Puerto ocupado
```bash
# Cambiar puerto en .env
PORT=3001

# O matar proceso en puerto 3000
npx kill-port 3000
```

### Errores de migración
```bash
# Reset de base de datos (⚠️ borra datos)
npx prisma migrate reset

# Generar cliente Prisma
npx prisma generate
```

## 📝 Licencia

Este proyecto es privado y está destinado para uso interno.

## 👨‍💻 Autor

**Alexis Pérez**  
GitHub: [@AlexcodePB](https://github.com/AlexcodePB)

---

### 🔄 Estado del Proyecto

✅ **Funcional** - API lista para desarrollo  
🚧 **En desarrollo** - Nuevas features en progreso  

**Última actualización**: $(date +%Y-%m-%d)