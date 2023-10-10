import { BASE_API } from "../utils/constants";

export async function getCategoriesApi() {
  try {
    const url = `${BASE_API}/api/categories/categories/`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function saveCategoryApi(token, category) {
  try {
    const formData = new FormData();
    formData.append("image", category.image);
    formData.append("title", category.title);

    const url = `${BASE_API}/api/categories/categories/`;
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

export async function updateCategoryApi(token, category) {
  try {
    const formData = new FormData();
    formData.append("title", category.title);
    if (category.image) formData.append("image", category.image);

    const url = `${BASE_API}/api/categories/categories/${category.id}/`;
    const params = {
      method: "PUT",
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

export async function deleteCategoryApi(token, category) {
  try {
    const url = `${BASE_API}/api/categories/categories/${category.id}/`;
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
