import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ENDPOINTS, getToken } from "../config";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { refreshCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${ENDPOINTS.PRODUCTS}/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const addToCart = async () => {
    const token = getToken();
    if (!token) return alert("Please login first");

    try {
      const res = await fetch(ENDPOINTS.CART, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: [{ product: product._id, quantity: 1 }],
        }),
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

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "300px", height: "300px" }}
      />
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}
