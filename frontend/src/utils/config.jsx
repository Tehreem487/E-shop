const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE}/auth/login`,
  SIGNUP: `${API_BASE}/auth/signup`,

  // Products
  PRODUCTS: `${API_BASE}/products`,

  // Cart
  CART: `${API_BASE}/cart`,
};

// Token helpers
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

// Decode JWT safely
export const getUserFromToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
};