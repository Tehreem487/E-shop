// src/config.js

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://e-shop-production-1737.up.railway.app/api";

console.log("API BASE URL:", API_BASE);

export const ENDPOINTS = {
  LOGIN: `${API_BASE}/auth/login`,
  SIGNUP: `${API_BASE}/auth/signup`,
  PRODUCTS: `${API_BASE}/products`,
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

// Decode JWT token
export const getUserFromToken = () => {
  const token = getToken();

  if (!token) return null;

  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};