# CER (Cuidando el Rancho) - Project Structure

## Recommended Folder Structure

```
CER/
├── frontend/                          # React application
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── assets/
│   │       ├── images/
│   │       ├── videos/
│   │       └── icons/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/               # Reusable components
│   │   │   │   ├── Header/
│   │   │   │   ├── Footer/
│   │   │   │   ├── Navbar/
│   │   │   │   ├── VideoPlayer/
│   │   │   │   └── LoadingSpinner/
│   │   │   ├── pages/                # Page-specific components
│   │   │   │   ├── Home/
│   │   │   │   ├── Episodes/
│   │   │   │   ├── Characters/
│   │   │   │   ├── News/
│   │   │   │   ├── Shop/
│   │   │   │   └── About/
│   │   │   └── admin/                # Admin panel components
│   │   │       ├── Dashboard/
│   │   │       ├── ContentManager/
│   │   │       ├── EpisodeEditor/
│   │   │       └── UserManager/
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── services/                 # API calls
│   │   ├── utils/                    # Helper functions
│   │   ├── contexts/                 # React contexts
│   │   ├── styles/                   # CSS/SCSS files
│   │   ├── constants/                # App constants
│   │   └── types/                    # TypeScript types (if using TS)
│   ├── package.json
│   └── README.md
│
├── backend/                          # Node.js API
│   ├── src/
│   │   ├── controllers/              # Route handlers
│   │   │   ├── episodeController.js
│   │   │   ├── newsController.js
│   │   │   ├── shopController.js
│   │   │   ├── commentController.js
│   │   │   └── adminController.js
│   │   ├── models/                   # Database models
│   │   │   ├── Episode.js
│   │   │   ├── News.js
│   │   │   ├── Product.js
│   │   │   ├── Comment.js
│   │   │   └── User.js
│   │   ├── routes/                   # API routes
│   │   │   ├── episodes.js
│   │   │   ├── news.js
│   │   │   ├── shop.js
│   │   │   ├── comments.js
│   │   │   └── admin.js
│   │   ├── middleware/               # Custom middleware
│   │   │   ├── auth.js
│   │   │   ├── validation.js
│   │   │   └── cors.js
│   │   ├── config/                   # Configuration files
│   │   │   ├── database.js
│   │   │   ├── environment.js
│   │   │   └── cloudinary.js (for image uploads)
│   │   ├── utils/                    # Helper functions
│   │   ├── services/                 # Business logic
│   │   └── uploads/                  # File uploads (temporary)
│   ├── tests/                        # API tests
│   ├── package.json
│   └── README.md
│
├── shared/                           # Shared utilities/types
│   ├── constants/
│   ├── types/
│   └── utils/
│
├── docs/                            # Documentation
│   ├── API.md
│   ├── DEPLOYMENT.md
│   └── FEATURES.md
│
├── scripts/                         # Build/deployment scripts
│   ├── build.sh
│   ├── deploy.sh
│   └── seed-database.js
│
├── .gitignore
├── docker-compose.yml              # For local development
├── README.md
└── package.json                    # Root package.json for scripts
```

## Key Features Addressed:

✅ **Admin Panel** - Content management for episodes, news, products
✅ **YouTube Integration** - VideoPlayer component for embedding
✅ **Comments & Ratings** - User interaction features
✅ **E-commerce** - Shop section for merchandise
✅ **Blog/News** - News section for show updates
✅ **Scalable Auth** - Prepared for future user authentication
✅ **Mobile Ready** - Responsive design structure

## Technology Stack Recommendations:

### Frontend:
- **React** (Create React App or Vite)
- **React Router** (navigation)
- **Axios** (API calls)
- **React Query/SWR** (data fetching & caching)
- **Tailwind CSS** or **Styled Components** (styling)

### Backend:
- **Node.js** with **Express.js**
- **PostgreSQL** with **Sequelize** (moderate complexity, great for relationships)
- **Cloudinary** (image/video management)
- **JWT** (future authentication)
- **Express Validator** (input validation)

### Additional Tools:
- **Nodemon** (development)
- **Cors** (cross-origin requests)
- **Helmet** (security)
- **Morgan** (logging)
