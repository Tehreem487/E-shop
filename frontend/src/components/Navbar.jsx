import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ROUTES from "../utils/routes";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const role = user?.role || "guest";

  return (
    <nav className="navbar">
      <h1 onClick={() => navigate("/")}>Shop</h1>
      <div>
        <button onClick={() => navigate(ROUTES.HOME)}>Home</button>
        <button onClick={() => navigate(ROUTES.PRODUCTS)}>Products</button>
        <button onClick={() => navigate(ROUTES.CART)}>Cart</button>

        {!user && (
          <>
            <button onClick={() => navigate(ROUTES.LOGIN)}>Login</button>
            <button onClick={() => navigate(ROUTES.SIGNUP)}>Sign Up</button>
          </>
        )}

        {user && (
          <>
            <span>Hi, {user.name}</span>
            {role === "admin" && (
              <button onClick={() => navigate(ROUTES.ADMIN_PRODUCTS)}>
                Manage Products
              </button>
            )}
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
