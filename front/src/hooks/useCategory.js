import { useState } from "react";
import {
  deleteCategoryApi,
  getCategoriesApi,
  saveCategoryApi,
  updateCategoryApi,
} from "../api/category";
import { useAuth } from ".";

export function useCategory() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(null);

  const { auth } = useAuth();

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await getCategoriesApi();
      setCategories(response);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const saveCategory = async (category) => {
    try {
      setLoading(true);
      await saveCategoryApi(auth.token, category);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const updateCategory = async (category) => {
    try {
      setLoading(true);
      await updateCategoryApi(auth.token, category);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const deleteCategory = async (category) => {
    try {
      setLoading(true);
      await deleteCategoryApi(auth.token, category);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    categories,
    getCategories,
    saveCategory,
    updateCategory,
    deleteCategory,
  };
}
