const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080/api/products";

async function handleResponse(response) {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed: ${response.status}`);
  }
  return response.json();
}

export async function getAllProducts() {
  return handleResponse(await fetch(API_BASE));
}

export async function getProductById(id) {
  return handleResponse(await fetch(`${API_BASE}/${id}`));
}

export async function searchProducts(name) {
  const params = new URLSearchParams({ name });
  return handleResponse(await fetch(`${API_BASE}/search?${params}`));
}

export async function getMaxPriceProduct() {
  return handleResponse(await fetch(`${API_BASE}/max-price`));
}

export async function createProduct(product) {
  return handleResponse(
    await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    })
  );
}

export async function updateProduct(id, product) {
  return handleResponse(
    await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    })
  );
}

export async function deleteProduct(id) {
  const response = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Delete failed: ${response.status}`);
  }
  return true;
}
