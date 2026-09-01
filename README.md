# Neon Nights 🎧

Landing page para una fiesta de música electrónica construida con **React** y **Tailwind CSS**.

Web 100% frontend: no requiere servidor backend, todo funciona en el navegador.

## 🚀 Inicio rápido

```bash
cd frontend
npm install
npm run dev
# Abre http://localhost:3000
```

## 📁 Estructura
```
neon-nights/
└── frontend/
    ├── src/
    │   ├── components/    # Navbar, Hero, Countdown, LineUp, Location, Tickets, RSVPForm, Footer
    │   ├── App.jsx
    │   └── main.jsx
    ├── tailwind.config.js
    └── vite.config.js
```

## 🧩 Secciones
- **Hero** — Titular neón, fecha y CTA
- **Countdown** — Cuenta regresiva en vivo
- **Line Up** — 6 DJs con estilos
- **Location** — Recinto + Google Maps
- **Tickets** — 3 tiers (General, VIP, VIP+)
- **RSVP** — Formulario de confirmación (local, sin servidor)
- **Footer** — Redes sociales

## 🔧 Scripts
| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Vite dev server (puerto 3000) |
| `npm run build` | Build de producción |
| `npm run preview` | Previsualizar build |

## 🛠️ Deploy
La web es estática: súbela a **Netlify** o **Vercel** tal cual.
