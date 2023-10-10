import React, { useEffect, useState } from "react";
import {
  CategoriesTable,
  CategoryForm,
  HeaderPage,
} from "../../components/Admin";
import { useCategory } from "../../hooks";
import { Loader } from "semantic-ui-react";
import { ModalBasic } from "../../components/Common/ModalBasic";

export function CategoriesAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);

  const [refetch, setRefetch] = useState(true);
  const { loading, categories, getCategories, deleteCategory } = useCategory();

  useEffect(() => {
    getCategories();
  }, [refetch]);

  const openCloseModal = () => setShowModal((prevState) => !prevState);
  const onRefetch = () => setRefetch((prevState) => !prevState);

  const addCategory = () => {
    const category = {
      id: 0,
      title: "",
      image: "",
      create: true,
    };
    setTitleModal("Add category");
    setContentModal(
      <CategoryForm
        category={category}
        onClose={openCloseModal}
        onRefetch={onRefetch}
      />
    );
    openCloseModal();
  };

  const updateCategory = (category) => {
    category = { ...category, create: false };
    setTitleModal("Update category");
    setContentModal(
      <CategoryForm
        category={category}
        onClose={openCloseModal}
        onRefetch={onRefetch}
      />
    );
    openCloseModal();
  };

  const onDeleteCategory = async (category) => {
    try {
      const result = window.confirm(
        `Are you sure you want to delete ${category.title} category?`
      );
      console.log(result);
      if (result) {
        await deleteCategory(category);
        onRefetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <HeaderPage
        title="Categorias"
        btnTitle="Agregar Categoria"
        btnClick={addCategory}
      />
      {loading ? (
        <Loader active inline="centered">
          Loading...
        </Loader>
      ) : (
        <CategoriesTable
          categories={categories}
          updateCategory={updateCategory}
          onDeleteCategory={onDeleteCategory}
        />
      )}
      <ModalBasic
        title={titleModal}
        size="small"
        show={showModal}
        onClose={openCloseModal}
        children={contentModal}
      />
    </>
  );
}
