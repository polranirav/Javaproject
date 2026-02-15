import { useEffect, useState } from "react";
import {
  getAllProducts,
  getMaxPriceProduct,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "./api.js";

const emptyProduct = {
  id: "",
  name: "",
  price: "",
  category: "",
  description: ""
};

export default function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyProduct);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setError("");
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function startEdit(product) {
    setForm({
      id: product.id,
      name: product.name || "",
      price: product.price ?? "",
      category: product.category || "",
      description: product.description || ""
    });
  }

  function resetForm() {
    setForm(emptyProduct);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setError("");
      const payload = {
        name: form.name,
        price: form.price,
        category: form.category,
        description: form.description
      };
      if (form.id) {
        await updateProduct(form.id, payload);
      } else {
        await createProduct(payload);
      }
      resetForm();
      await loadProducts();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      setError("");
      await deleteProduct(id);
      await loadProducts();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleSearch() {
    try {
      setError("");
      const data = await searchProducts(search);
      setProducts(data);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleMaxPrice() {
    try {
      setError("");
      const data = await getMaxPriceProduct();
      setProducts([data]);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="container">
      <header>
        <h1>Product CRUD</h1>
        <p>Spring Boot REST API + React</p>
      </header>

      <section className="card">
        <h2>{form.id ? "Update Product" : "Create Product"}</h2>
        <form onSubmit={handleSubmit} className="form">
          <label>
            Name
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Price
            <input
              name="price"
              type="number"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Category
            <input name="category" value={form.category} onChange={handleChange} />
          </label>
          <label>
            Description
            <textarea name="description" value={form.description} onChange={handleChange} />
          </label>
          <div className="actions">
            <button type="submit">{form.id ? "Update" : "Create"}</button>
            <button type="button" className="secondary" onClick={resetForm}>
              Clear
            </button>
          </div>
        </form>
      </section>

      <section className="card">
        <h2>Search & Filters</h2>
        <div className="filters">
          <input
            placeholder="Search by name"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button type="button" onClick={handleSearch}>
            Search
          </button>
          <button type="button" onClick={loadProducts} className="secondary">
            Reset
          </button>
          <button type="button" onClick={handleMaxPrice} className="secondary">
            Max Price Product
          </button>
        </div>
      </section>

      <section className="card">
        <h2>Products</h2>
        {error && <p className="error">{error}</p>}
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category || "-"}</td>
                  <td>{product.description || "-"}</td>
                  <td>
                    <button type="button" onClick={() => startEdit(product)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="danger"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
