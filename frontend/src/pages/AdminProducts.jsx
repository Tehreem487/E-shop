import { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";
import { ENDPOINTS, getToken } from "../config";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const token = getToken();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(ENDPOINTS.PRODUCTS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch");
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const res = await fetch(`${ENDPOINTS.PRODUCTS}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");
      fetchProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (product) => setEditingProduct(product);
  const handleFormSuccess = () => {
    setEditingProduct(null);
    fetchProducts();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Products</h1>
      <ProductForm
        productToEdit={editingProduct}
        onSuccess={handleFormSuccess}
      />
      <div style={{ marginTop: "30px" }}>
        <h2>Product List</h2>
        {products.length === 0 && <p>No products found.</p>}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Price
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {p.name}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  ${p.price}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <button onClick={() => handleEdit(p)}>Edit</button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    style={{ background: "red", color: "#fff" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
