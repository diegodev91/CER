// Frontend Authentication Service
// Add this to src/services/authService.js

class AuthService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';
    this.tokenKey = 'accessToken';
    this.refreshTokenKey = 'refreshToken';
    this.userKey = 'user';
  }

  // API helper
  async apiCall(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    // Add auth header if token exists
    const token = this.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      // Handle token refresh
      if (response.status === 401 && data.code === 'TOKEN_INVALID') {
        const refreshed = await this.refreshToken();
        if (refreshed) {
          // Retry original request with new token
          config.headers.Authorization = `Bearer ${this.getToken()}`;
          const retryResponse = await fetch(url, config);
          return await retryResponse.json();
        } else {
          this.logout();
          throw new Error('Session expired');
        }
      }

      if (!response.ok) {
        throw new Error(data.error || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }

  // Authentication methods
  async register(userData) {
    const response = await this.apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    return response;
  }

  async login(email, password) {
    const response = await this.apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    if (response.tokens) {
      this.setToken(response.tokens.accessToken);
      this.setRefreshToken(response.tokens.refreshToken);
      this.setUser(response.user);
    }

    return response;
  }

  async logout() {
    try {
      await this.apiCall('/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      this.clearStorage();
    }
  }

  async refreshToken() {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) return false;

      const response = await this.apiCall('/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({ refreshToken })
      });

      if (response.tokens) {
        this.setToken(response.tokens.accessToken);
        this.setRefreshToken(response.tokens.refreshToken);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  }

  async verifyEmail(token) {
    return await this.apiCall(`/auth/verify-email?token=${token}`);
  }

  async resendVerification(email) {
    return await this.apiCall('/auth/resend-verification', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
  }

  async forgotPassword(email) {
    return await this.apiCall('/users/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
  }

  async resetPassword(token, newPassword) {
    return await this.apiCall('/users/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword })
    });
  }

  // User profile methods
  async getProfile() {
    return await this.apiCall('/users/profile');
  }

  async updateProfile(profileData) {
    const response = await this.apiCall('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
    
    if (response.user) {
      this.setUser(response.user);
    }
    
    return response;
  }

  async changePassword(currentPassword, newPassword) {
    return await this.apiCall('/users/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword })
    });
  }

  async sendPhoneVerification() {
    return await this.apiCall('/users/send-phone-verification', {
      method: 'POST'
    });
  }

  async verifyPhone(code) {
    return await this.apiCall('/users/verify-phone', {
      method: 'POST',
      body: JSON.stringify({ code })
    });
  }

  // Session management
  async getSessions() {
    return await this.apiCall('/users/sessions');
  }

  async revokeSession(sessionId) {
    return await this.apiCall(`/users/sessions/${sessionId}`, {
      method: 'DELETE'
    });
  }

  // Storage helpers
  setToken(token) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  setRefreshToken(token) {
    localStorage.setItem(this.refreshTokenKey, token);
  }

  getRefreshToken() {
    return localStorage.getItem(this.refreshTokenKey);
  }

  setUser(user) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getUser() {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  clearStorage() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userKey);
  }

  // Auth state helpers
  isAuthenticated() {
    return !!this.getToken();
  }

  isEmailVerified() {
    const user = this.getUser();
    return user ? user.isEmailVerified : false;
  }

  hasRole(role) {
    const user = this.getUser();
    return user ? user.role === role : false;
  }

  hasAnyRole(roles) {
    const user = this.getUser();
    return user ? roles.includes(user.role) : false;
  }

  canPerform(action) {
    const user = this.getUser();
    if (!user) return false;

    const permissions = {
      'super_admin': ['*'],
      'admin': [
        'users.read', 'users.update', 'users.delete',
        'episodes.create', 'episodes.update', 'episodes.delete', 'episodes.read',
        'news.create', 'news.update', 'news.delete', 'news.read',
        'products.create', 'products.update', 'products.delete', 'products.read',
        'comments.moderate', 'comments.delete', 'comments.read',
        'reels.create', 'reels.update', 'reels.delete', 'reels.read'
      ],
      'moderator': [
        'episodes.read', 'news.read', 'products.read', 'reels.read',
        'comments.moderate', 'comments.delete', 'comments.read'
      ],
      'user': [
        'episodes.read', 'news.read', 'products.read', 'reels.read',
        'comments.create', 'comments.read'
      ]
    };

    const userPermissions = permissions[user.role] || [];
    return userPermissions.includes('*') || userPermissions.includes(action);
  }
}

// Create and export singleton instance
const authService = new AuthService();
export default authService;

// React hooks for auth state management
import { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initAuth = () => {
      const token = authService.getToken();
      const savedUser = authService.getUser();
      
      if (token && savedUser) {
        setUser(savedUser);
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      setUser(response.user);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    authService.setUser(updatedUser);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser,
    authService
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Usage example component
/*
import React, { useState } from 'react';
import { useAuth } from './authService';

const LoginForm = () => {
  const { login, isAuthenticated, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <div>Welcome, {user.firstName}!</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
*/
