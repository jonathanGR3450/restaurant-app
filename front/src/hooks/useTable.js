import { useState } from "react";
import {
  deleteTableApi,
  getTablesApi,
  saveTableApi,
  updateTableApi,
} from "../api/tables";
import { useAuth } from "./useAuth";

export default function useTable() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tables, setTables] = useState(null);

  const { auth } = useAuth();

  const getTables = async () => {
    try {
      setLoading(true);
      const response = await getTablesApi();
      setTables(response);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const saveTable = async (table) => {
    try {
      setLoading(true);
      await saveTableApi(auth.token, table);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const updateTable = async (table) => {
    try {
      setLoading(true);
      await updateTableApi(auth.token, table);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const deleteTable = async (table) => {
    try {
      setLoading(true);
      await deleteTableApi(auth.token, table);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    tables,
    getTables,
    saveTable,
    updateTable,
    deleteTable,
  };
}
