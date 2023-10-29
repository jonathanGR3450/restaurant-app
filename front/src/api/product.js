import { BASE_API } from "../utils/constants";

export async function getProductsApi() {
  try {
    const url = `${BASE_API}/api/products/products/`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function saveProductApi(token, product) {
  try {
    const url = `${BASE_API}/api/products/products/`;
    const formData = new FormData();
    formData.append("image", product.image);
    formData.append("title", product.title);
    formData.append("price", Number.parseFloat(product.price));
    formData.append("active", product.active);
    formData.append("category", product.category);

    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateProductApi(token, product) {
  try {
    console.log(Number.parseFloat(product.price));
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("price", Number.parseFloat(product.price));
    formData.append("active", product.active);
    formData.append("category", product.category);

    const url = `${BASE_API}/api/products/products/${product.id}/`;
    const params = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };
    const response = await fetch(url, params);
    const result = await response.json();

    if (product.image) formData.append("image", product.image);
  } catch (error) {
    throw error;
  }
}

export async function deleteProductApi(token, product) {
  try {
    const url = `${BASE_API}/api/products/products/${product.id}`;
    const params = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
