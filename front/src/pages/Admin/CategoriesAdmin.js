import React, { useEffect } from "react";
import { HeaderPage } from "../../components/Admin";
import { useCategory } from "../../hooks";
import { Loader } from "semantic-ui-react";

export function CategoriesAdmin() {
  const { loading, categories, getCategories } = useCategory();
  console.log(categories);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <HeaderPage title="Categorias" btnTitle="Agregar Categoria" />
      {loading ? (
        <Loader active inline="centered">
          Loading...
        </Loader>
      ) : (
        <div>lol</div>
      )}
    </>
  );
}
