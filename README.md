# CER - Cuidando el Rancho

Una aplicación web moderna para el programa de YouTube "Cuidando el Rancho" de RORO Network. Una plataforma completa para los **CerRanos** con episodios embebidos, reels, noticias y merchandise oficial.

## 🎬 Acerca del Programa

**CER - Cuidando el Rancho** es un programa de YouTube que se transmite en el canal **RORO Network**. Nuestra comunidad de seguidores se llama cariñosamente **"CerRanos"** y esta plataforma web está diseñada especialmente para ellos.

### Funcionalidades principales:
- 📺 **Episodios de YouTube embebidos** - Ver todos los episodios directamente en la web
- 🎥 **Reels y contenido corto** - Los mejores momentos en formato corto
- 📰 **Noticias y actualizaciones** - Últimas novedades del programa
- 🛒 **Tienda CerRanos** - Merchandise oficial exclusivo
- 💬 **Comunidad** - Interacción entre CerRanos

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL
- npm or yarn

### Installation

1. **Clone and install dependencies:**
```bash
cd CER
npm run install:all
```

2. **Set up the database:**
```bash
# Create PostgreSQL database
createdb cer_database

# Copy environment file and configure
cd backend
cp .env.example .env
# Edit .env with your database credentials
```

3. **Run the application:**
```bash
# From the root directory
npm run dev
```

This will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 📁 Project Structure

```
CER/
├── frontend/          # React application
├── backend/           # Node.js API
├── shared/            # Shared utilities
├── docs/              # Documentation
└── scripts/           # Build scripts
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI framework
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **React Query** - Data fetching
- **React Hook Form** - Form handling
- **React YouTube** - Video embedding

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Sequelize** - ORM
- **JWT** - Authentication
- **Cloudinary** - Media management

## 🌟 Features

- ✅ Episode management with YouTube integration
- ✅ News/Blog system
- ✅ E-commerce for merchandise
- ✅ User comments and ratings
- ✅ Admin panel for content management
- ✅ Responsive design
- ✅ SEO optimized

## 📖 API Documentation

API endpoints are available at `/api/health` for server status.

Main endpoints:
- `/api/episodes` - Episode management
- `/api/news` - News/blog posts
- `/api/shop` - Products and merchandise
- `/api/comments` - User comments
- `/api/admin` - Admin functions

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
```

### Backend (Heroku/Railway)
Set environment variables and deploy the backend folder.

## 📝 License

MIT License - see LICENSE file for details.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
