import { useState } from "react";
import { getCategoriesApi } from "../api/category";

export function useCategory() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(null);

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

  return {
    loading,
    error,
    categories,
    getCategories,
  };
}
