import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ROUTES from "../utils/routes";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  return (
    <nav className="navbar">
      <h1 className="logo" onClick={() => navigate(ROUTES.HOME)}>
        Shop
      </h1>

      <div className="nav-links">
        <button onClick={() => navigate(ROUTES.HOME)}>Home</button>
        <button onClick={() => navigate(ROUTES.PRODUCTS)}>Products</button>
        <button onClick={() => navigate(ROUTES.CART)}>Cart</button>

        {!user ? (
          <>
            <button onClick={() => navigate(ROUTES.LOGIN)}>Login</button>
            <button onClick={() => navigate(ROUTES.SIGNUP)}>Sign Up</button>
          </>
        ) : (
          <>
            <span className="user-text">Hi, {user.name}</span>

            {user.role === "admin" && (
              <button onClick={() => navigate(ROUTES.ADMIN_PRODUCTS)}>
                Admin Panel
              </button>
            )}

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;