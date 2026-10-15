import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

interface ProtectedRouteProps {
  requireStaff?: boolean;
}

export default function ProtectedRoute({
  requireStaff = false,
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-slate-950"
      >
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-orange-400/20 border-t-orange-400" />
          <p className="text-sm text-slate-300">در حال بررسی دسترسی...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (requireStaff && !user.is_staff) {
    return <Navigate to="/user" replace />;
  }

  if (!requireStaff && user.is_staff) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}
