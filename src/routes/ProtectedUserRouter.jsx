import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';

import useAuth from '@/hooks/useAuth';

function ProtectedUserRoute({ allowedRoles, children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/signin" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children || <Outlet />;
}

ProtectedUserRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node,
};

ProtectedUserRoute.defaultProps = {
  children: null,
};

export default ProtectedUserRoute;
