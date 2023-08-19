import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
  isAllowed,
  children,
  redirectTo = "/",
}) => {

  if (!isAllowed) {
    return <Navigate to={redirectTo} />;
  }

  return children ? children : <Outlet />;
};

ProtectedRoute.propTypes = {
  isAllowed: PropTypes.bool.isRequired,
  children: PropTypes.node,
  redirectTo: PropTypes.string,
}

export default ProtectedRoute;