import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { Loading } from "../components";
import { authSelector } from "../redux/selector";

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useSelector(authSelector);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (currentUser) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
