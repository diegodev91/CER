# CER - Cuidando el Rancho

[![GitHub License](https://img.shields.io/github/license/diegodev91/CER)](https://github.com/diegodev91/CER/blob/main/LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/diegodev91/CER)](https://github.com/diegodev91/CER/stargazers)
[![GitHub Issues](https://img.shields.io/github/issues/diegodev91/CER)](https://github.com/diegodev91/CER/issues)
[![YouTube Channel](https://img.shields.io/badge/YouTube-RORO%20Network-red?style=flat&logo=youtube)](https://youtube.com/@roronetwork)

Una aplicación web moderna para el grupo de comedia "CER - Cuidando el Rancho" de RORO Network. Una plataforma completa para los **CERranos** con episodios embebidos, reels, noticias y merchandise oficial.

## 🎬 Acerca del Programa

**CER - Cuidando el Rancho** es un grupo de comedia que se transmite en el canal de YouTube **RORO Network**. Nuestra comunidad de seguidores se llama cariñosamente **"CERranos"** y esta plataforma web está diseñada especialmente para ellos.

### Funcionalidades principales:
- 📺 **Episodios de YouTube embebidos** - Ver todos los episodios directamente en la web
- 🎥 **Reels y contenido corto** - Los mejores momentos en formato corto
- 📰 **Noticias y actualizaciones** - Últimas novedades del programa
- 🛒 **Tienda CERranos** - Merchandise oficial exclusivo
- 💬 **Comunidad** - Interacción entre CERranos

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
 
- npm or yarn

### Installation

1. **Clone and install dependencies:**
```bash
cd CER
npm run install:all
```

2. **Set up the database:**
```bash
# Create database
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
 
- **Sequelize** - ORM
- **JWT** - Authentication
- **Cloudinary** - Media management

## 🌟 Features

- ✅ Episode management with YouTube integration
- ✅ **Reels system** - Short-form content with categories and filtering
- ✅ News/Blog system
- ✅ E-commerce for merchandise
- ✅ User comments and ratings
- ✅ Admin panel for content management
- ✅ Responsive design
- ✅ SEO optimized
- ✅ **React YouTube** integration for embedded videos

## 🎥 Screenshots

### Home Page - Community CERranos
![Home Page](https://via.placeholder.com/800x400/22c55e/ffffff?text=CER+Home+Page)

### Reels Section - YouTube Integration
![Reels Page](https://via.placeholder.com/800x400/ef4444/ffffff?text=CER+Reels+Page)

### About Page - Our Story
![About Page](https://via.placeholder.com/800x400/3b82f6/ffffff?text=CER+About+Page)

## 📖 API Documentation

API endpoints are available at `/api/health` for server status.

Main endpoints:
- `/api/episodes` - Episode management
- `/api/reels` - **NEW!** Reels management with YouTube integration
  - `GET /api/reels` - Get all reels with optional category filtering
  - `POST /api/reels` - Create new reel (admin)
  - `PUT /api/reels/:id` - Update reel (admin)
  - `DELETE /api/reels/:id` - Delete reel (admin)
- `/api/news` - News/blog posts
- `/api/shop` - Products and merchandise
- `/api/comments` - User comments
- `/api/admin` - Admin functions

### Reels API Examples

```javascript
// Get all reels
GET /api/reels

// Get reels by category
GET /api/reels?category=highlights

// Create new reel
POST /api/reels
{
  "title": "Best Moments Episode 5",
  "description": "Los mejores momentos del episodio 5",
  "youtubeUrl": "https://youtube.com/watch?v=VIDEO_ID",
  "category": "highlights",
  "featured": true
}
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
```

### Backend (Heroku/Railway)
Set environment variables and deploy the backend folder.

Required environment variables:
```bash

JWT_SECRET=your_jwt_secret_here
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
PORT=5000
```

## 🤝 Contributing to CER

We welcome contributions from the CERranos community! Here's how you can help:

### Development Setup
1. Fork this repository
2. Clone your fork locally
3. Create a new branch: `git checkout -b feature/amazing-feature`
4. Follow the installation steps above
5. Make your changes
6. Test thoroughly
7. Commit: `git commit -m 'Add amazing feature'`
8. Push: `git push origin feature/amazing-feature`
9. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Keep commits atomic and well-described
- Be respectful and constructive in discussions

### Areas Where We Need Help
- 🎨 UI/UX improvements
- 🐛 Bug fixes and testing
- 📱 Mobile responsiveness
- 🌍 Internationalization (i18n)
- 📊 Analytics and SEO
- 🔒 Security enhancements

## 📞 Contact & Community

- 📺 **YouTube**: [RORO Network](https://youtube.com/@roronetwork)
- 🐛 **Issues**: [GitHub Issues](https://github.com/diegodev91/CER/issues)
- 💡 **Discussions**: [GitHub Discussions](https://github.com/diegodev91/CER/discussions)
- 📧 **Email**: Contact through GitHub

## 🙏 Acknowledgments

- RORO Network for the amazing YouTube content
- The CERranos community for their support
- All contributors who help improve this platform
- Open source libraries that make this project possible

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>🌟 Made with ❤️ for the CERranos community 🌟</p>
  <p>
    <a href="https://youtube.com/@roronetwork">
      <img src="https://img.shields.io/badge/YouTube-Subscribe-red?style=for-the-badge&logo=youtube" alt="Subscribe to RORO Network">
    </a>
  </p>
</div>
