import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Toast from './components/common/Toast';

import ProtectedRoute from './guards/ProtectedRoute';
import AdminRoute from './guards/AdminRoute';

import LandingPage from './pages/landing/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import DiscoverPage from './pages/discover/DiscoverPage';
import UserProfilePage from './pages/discover/UserProfilePage';
import ConnectionsPage from './pages/connections/ConnectionsPage';
import ConnectionDetailPage from './pages/connections/ConnectionDetailPage';
import MomentsPage from './pages/moments/MomentsPage';
import ExperiencesPage from './pages/experiences/ExperiencesPage';
import ExperienceDetailPage from './pages/experiences/ExperienceDetailPage';
import BookingsPage from './pages/bookings/BookingsPage';
import NotificationsPage from './pages/notifications/NotificationsPage';
import MyProfilePage from './pages/profile/MyProfilePage';
import EditProfilePage from './pages/profile/EditProfilePage';
import SettingsPage from './pages/settings/SettingsPage';
import PrivacySettingsPage from './pages/settings/PrivacySettingsPage';
import SafetyCenterPage from './pages/safety/SafetyCenterPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminReportsPage from './pages/admin/AdminReportsPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toast />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/discover" element={<ProtectedRoute><DiscoverPage /></ProtectedRoute>} />
          <Route path="/discover/:id" element={<ProtectedRoute><UserProfilePage /></ProtectedRoute>} />
          <Route path="/connections" element={<ProtectedRoute><ConnectionsPage /></ProtectedRoute>} />
          <Route path="/connections/:id" element={<ProtectedRoute><ConnectionDetailPage /></ProtectedRoute>} />
          <Route path="/moments" element={<ProtectedRoute><MomentsPage /></ProtectedRoute>} />
          <Route path="/experiences" element={<ProtectedRoute><ExperiencesPage /></ProtectedRoute>} />
          <Route path="/experiences/:id" element={<ProtectedRoute><ExperienceDetailPage /></ProtectedRoute>} />
          <Route path="/bookings" element={<ProtectedRoute><BookingsPage /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><MyProfilePage /></ProtectedRoute>} />
          <Route path="/profile/edit" element={<ProtectedRoute><EditProfilePage /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          <Route path="/settings/privacy" element={<ProtectedRoute><PrivacySettingsPage /></ProtectedRoute>} />
          <Route path="/safety" element={<ProtectedRoute><SafetyCenterPage /></ProtectedRoute>} />

          <Route path="/admin" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><AdminUsersPage /></AdminRoute>} />
          <Route path="/admin/reports" element={<AdminRoute><AdminReportsPage /></AdminRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
