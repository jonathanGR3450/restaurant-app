import { getMeApi, getUsersApi, addUserApi } from "../api/user";
import { useAuth } from ".";
import { useState } from "react";

export function useUser() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState(null);

  const getMe = async (token) => {
    try {
      const response = await getMeApi(token);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getUsers = async () => {
    try {
      setLoading(true);
      const token = auth.token;
      const response = await getUsersApi(token);
      setUsers(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const addUser = async (user) => {
    try {
      setLoading(true);
      await addUserApi(auth.token, user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    error,
    users,
    getMe,
    getUsers,
    addUser,
  };
}
