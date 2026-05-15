const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const ENDPOINTS = {
  LOGIN: `${API_BASE}/api/auth/login`,
  SIGNUP: `${API_BASE}/api/auth/signup`,
  PRODUCTS: `${API_BASE}/api/products`,
  CART: `${API_BASE}/api/cart`,
};

export const setToken = (token) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");
export const removeToken = () => localStorage.removeItem("token");

export const getUserFromToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};