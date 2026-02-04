import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Public pages (will create in next steps)
import Home from './pages/public/Home';
import SinglePost from './pages/public/SinglePost';
import Login from './pages/public/Login';
import Register from './pages/public/Register';

// Admin pages (will create in next steps)
import Dashboard from './pages/admin/Dashboard';
import AllPosts from './pages/admin/AllPosts';
import AddPost from './pages/admin/AddPost';
import EditPost from './pages/admin/EditPost';
import Categories from './pages/admin/Categories';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/post/:slug" element={<SinglePost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin routes (protected) */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requireAdmin>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/posts"
            element={
              <ProtectedRoute requireAdmin>
                <AllPosts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/posts/new"
            element={
              <ProtectedRoute requireAdmin>
                <AddPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/posts/edit/:id"
            element={
              <ProtectedRoute requireAdmin>
                <EditPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <ProtectedRoute requireAdmin>
                <Categories />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
