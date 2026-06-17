import { useEffect, useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-container">
      <h2 className="page-heading">🔥 Top Products</h2>

      <div className="product-grid">
        {products.map((p) => (
          <div key={p.id} className="product-item">
            <img src={p.image} />

            <h3>{p.title.slice(0, 20)}</h3>

            <p>${p.price}</p>

            <button
              className="add-cart-btn"
              onClick={() => navigate(`/product/${p.id}`)}
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;