import { useEffect, useState } from "react";
import { ENDPOINTS, getToken } from "../config";
import { useCart } from "../context/CartContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { refreshCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(ENDPOINTS.PRODUCTS);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    const token = getToken();
    if (!token) return alert("Please login first");

    try {
      const res = await fetch(ENDPOINTS.CART, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items: [{ product: productId, quantity: 1 }] }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Product added to cart!");
        refreshCart();
      } else {
        alert(data.message || "Failed to add to cart");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding product to cart");
    }
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        padding: "20px",
      }}
    >
      {products.map((p) => (
        <div
          key={p._id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "15px",
            width: "200px",
            textAlign: "center",
          }}
        >
          <img
            src={p.image}
            alt={p.name}
            style={{ width: "100%", borderRadius: "10px" }}
          />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
          <button
            onClick={() => addToCart(p._id)}
            style={{
              padding: "10px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
