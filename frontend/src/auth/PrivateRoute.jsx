
// --- src/auth/PrivateRoute.jsx ---
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function PrivateRoute({ children, role }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="text-center py-10 text-white">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
}