import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    // User is not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, render the component
  return <Route {...rest} element={<Element />} />;
};

export default PrivateRoute;
