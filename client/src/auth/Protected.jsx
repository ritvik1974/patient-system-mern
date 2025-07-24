import { Navigate } from "react-router-dom";

// Simulating an authentication check (you can replace this with real logic)
const isAuthenticated = () => {
  // check localStorage
  return localStorage.getItem("userdata") !== null;
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // Redirect to login if not authenticated
    return <Navigate to="/login-signup" />;
  }
  // If authenticated, render the protected component
  return children;
};

export default ProtectedRoute;
