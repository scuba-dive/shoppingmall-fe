import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';

import useAuth from '@/hooks/useAuth';

function ProtectedUserRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/signin" replace />;
  }

  return children || <Outlet />;
}

ProtectedUserRoute.propTypes = {
  children: PropTypes.node,
};

ProtectedUserRoute.defaultProps = {
  children: null,
};

export default ProtectedUserRoute;
