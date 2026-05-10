import { useEffect, useState } from "react";
import { ENDPOINTS, getToken } from "../config";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, setCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      const token = getToken();
      if (!token) return;

      try {
        const res = await fetch(ENDPOINTS.CART, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setCart(data);
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [setCart]);

  useEffect(() => {
    const t = cart.items?.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    setTotal(t || 0);
  }, [cart]);

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch(ENDPOINTS.CART, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: [{ product: productId, quantity: newQuantity }],
        }),
      });
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error(err);
      alert("Error updating cart");
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (!cart.items || cart.items.length === 0) return <p>Your cart is empty</p>;

  return (
    <div style={{ padding: "20px" }}>
      {cart.items.map((item) => (
        <div
          key={item.product._id}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
            borderBottom: "1px solid #ccc",
            paddingBottom: "10px",
          }}
        >
          <img
            src={item.product.image}
            alt={item.product.name}
            style={{ width: "100px", marginRight: "20px" }}
          />
          <div style={{ flex: 1 }}>
            <h3>{item.product.name}</h3>
            <p>${item.product.price}</p>
          </div>
          <div>
            <button
              onClick={() =>
                updateQuantity(item.product._id, item.quantity - 1)
              }
            >
              -
            </button>
            {item.quantity}
            <button
              onClick={() =>
                updateQuantity(item.product._id, item.quantity + 1)
              }
            >
              +
            </button>
          </div>
        </div>
      ))}
      <h2>Total: ${total}</h2>
    </div>
  );
}
