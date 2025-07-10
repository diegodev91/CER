import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

// Components
import Header from './components/common/Header/Header';
import Footer from './components/common/Footer/Footer';

// Pages
import Home from './components/pages/Home/Home';
import Episodes from './components/pages/Episodes/Episodes';
import EpisodeDetail from './components/pages/Episodes/EpisodeDetail';
import Reels from './components/pages/Reels/Reels';
import News from './components/pages/News/News';
import NewsDetail from './components/pages/News/NewsDetail';
import Shop from './components/pages/Shop/Shop';
import About from './components/pages/About/About';
import AdminDashboard from './components/admin/Dashboard/Dashboard';

// Styles
import './styles/globals.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/episodes" element={<Episodes />} />
              <Route path="/episodes/:id" element={<EpisodeDetail />} />
              <Route path="/reels" element={<Reels />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:slug" element={<NewsDetail />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin/*" element={<AdminDashboard />} />
            </Routes>
          </main>
          
          <Footer />
          
          {/* Toast notifications */}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
