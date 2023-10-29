import React, { useEffect, useState } from "react";
import { HeaderPage } from "../../components/Admin";
import { useProduct } from "../../hooks";
import { Loader } from "semantic-ui-react";
import { ProductsTable } from "../../components/Admin/Products/ProductsTable/ProductsTable";
import { ModalBasic } from "../../components/Common/ModalBasic";
import { ProductForm } from "../../components/Admin/Products/ProductForm/ProductForm";

export function ProductsAdmin() {
  const { loading, products, getProducts, deleteProduct } = useProduct();

  const [refetch, setRefetch] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setcontentModal] = useState(null);

  useEffect(() => {
    getProducts();
  }, [refetch]);

  const openCloseModal = () => setShowModal((prevState) => !prevState);
  const onRefetch = () => setRefetch((prevState) => !prevState);

  const addProduct = () => {
    const product = {
      id: "",
      title: "",
      image: "",
      price: "",
      category: 0,
      active: false,
      create: true,
    };
    setTitleModal("Add product");
    setcontentModal(
      <ProductForm
        product={product}
        onClose={openCloseModal}
        onRefetch={onRefetch}
      />
    );
    openCloseModal();
  };

  const updateProduct = (product) => {
    product = { ...product, create: false };
    setTitleModal("Update product");
    setcontentModal(
      <ProductForm
        product={product}
        onClose={openCloseModal}
        onRefetch={onRefetch}
      />
    );
    openCloseModal();
  };

  const onDeleteProduct = async (product) => {
    try {
      const result = window.confirm(
        `Are you sure you want to delete ${product.title} product?`
      );
      if (result) {
        await deleteProduct(product);
        onRefetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <HeaderPage
        title="Productos"
        btnTitle="Agregar producto"
        btnClick={addProduct}
      />
      {loading ? (
        <Loader active inline>
          Loading...
        </Loader>
      ) : (
        <ProductsTable
          products={products}
          updateProduct={updateProduct}
          onDeleteProduct={onDeleteProduct}
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
