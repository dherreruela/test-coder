# BiciShop - Tienda de Bicicletas

Aplicación web completa de venta de bicicletas con **React + Tailwind CSS** (frontend) y **Node.js + Express + MongoDB** (backend).

## Estructura

```
bike-shop/
├── frontend/          # React + Vite + Tailwind CSS
│   └── src/
│       ├── components/   # Header, Footer, ProductCard
│       ├── context/      # CartContext, AuthContext
│       ├── pages/        # Home, Catalog, ProductDetail, Cart, Login, Register, Checkout, Orders
│       └── services/     # api.js (cliente axios)
└── backend/           # Node.js + Express + MongoDB
    ├── models/        # Product, User, Order
    ├── routes/        # productRoutes, userRoutes, orderRoutes
    ├── middleware/    # authMiddleware (JWT)
    └── data/          # Seed data de productos
```

## Requisitos

- Node.js 18+
- Docker (para MongoDB) o MongoDB instalado localmente

## Puesta en marcha

### 1. Base de datos (MongoDB)

```bash
docker run -d --name bike-shop-mongo -p 27017:27017 -v bikeshop-data:/data/db mongo:7
```

### 2. Backend

```bash
cd backend
npm install
npm run seed       # importa productos de ejemplo
npm run dev        # servidor en http://localhost:5000
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev        # app en http://localhost:5173
```

## Funcionalidades

- Catálogo de productos con filtros por categoría y búsqueda
- Detalle de producto con especificaciones técnicas
- Carrito de compra con persistencia en localStorage
- Registro e inicio de sesión con JWT
- Finalización de compra con dirección de envío
- Historial de pedidos con estados (pendiente, procesando, enviado, entregado)

## API

| Método | Endpoint              | Descripción                    | Acceso  |
|--------|------------------------|--------------------------------|---------|
| GET    | /api/products          | Lista productos (filtros)      | Público |
| GET    | /api/products/:id      | Detalle de producto            | Público |
| POST   | /api/users/register    | Registrar usuario              | Público |
| POST   | /api/users/login       | Iniciar sesión                 | Público |
| GET    | /api/users/profile     | Perfil del usuario             | Privado |
| POST   | /api/orders            | Crear pedido                   | Privado |
| GET    | /api/orders/myorders   | Pedidos del usuario            | Privado |
| GET    | /api/orders/:id        | Detalle de pedido              | Privado |
