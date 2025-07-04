import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';

import useAuth from '@/hooks/useAuth';

function ProtectedAdminRoute({ allowedRoles, children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/signin" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children || <Outlet />;
}

ProtectedAdminRoute.propTypes = {
  allowedRoles: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
export default ProtectedAdminRoute;
