import React, { useState } from "react";
import { useAuth } from "./useAuth";
import {
  deleteProductApi,
  getProductsApi,
  saveProductApi,
  updateProductApi,
} from "../api/product";

export function useProduct() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState(null);

  const { auth } = useAuth();

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await getProductsApi();
      setProducts(response);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const saveProduct = async (product) => {
    try {
      setLoading(true);
      await saveProductApi(auth.token, product);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const updateProduct = async (product) => {
    try {
      setLoading(true);
      await updateProductApi(auth.token, product);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const deleteProduct = async (product) => {
    try {
      setLoading(true);
      await deleteProductApi(auth.token, product);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    products,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct,
  };
}
