import { BASE_API } from "../utils/constants";

export async function loginApi(formData) {
  try {
    const url = `${BASE_API}/api/users/auth/login`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    const response = await fetch(url, params);
    if (response.status !== 200) {
      throw new Error("credenciales invalidas");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getMeApi(token) {
  try {
    const url = `${BASE_API}/api/users/auth/me/`;
    const params = {
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

export async function getUsersApi(token) {
  try {
    const url = `${BASE_API}/api/users/users/`;
    const params = {
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

export async function addUserApi(token, user) {
  try {
    const url = `${BASE_API}/api/users/users/`;
    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error api");
    throw error;
  }
}
