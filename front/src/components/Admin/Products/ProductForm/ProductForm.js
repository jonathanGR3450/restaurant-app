import React, { useCallback, useEffect, useState } from "react";
import { Button, Checkbox, Dropdown, Form, Image } from "semantic-ui-react";
import { useCategory, useProduct } from "../../../../hooks";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./ProductForm.scss";
import { map } from "lodash";

export function ProductForm(props) {
  const { product, onClose, onRefetch } = props;
  const [previewFile, setPreviewFile] = useState(product.image);
  const { saveProduct, updateProduct } = useProduct();

  const { categories, getCategories } = useCategory();
  const [categoriesFormat, setCategoriesFormat] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    setCategoriesFormat(formatDropdown(categories));
  }, [categories]);

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    await formik.setFieldValue("image", file);
    setPreviewFile(URL.createObjectURL(file));
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
      "image/heic": [],
      "image/jfif": [],
    },
    noKeyboard: true,
    multiple: false,
    onDrop: onDrop,
  });

  const formik = useFormik({
    initialValues: initialValues(product),
    validationSchema: Yup.object(
      product.create ? validationSchema() : validationSchemaUpdate()
    ),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log(formValue);
      try {
        if (product.create) {
          const response = await saveProduct(formValue);
        } else {
          const response = await updateProduct(formValue);
        }
        onRefetch();
        onClose();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Form className="add-edit-product-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        placeholder="name product"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.errors.title}
      />
      <Form.Input
        type="number"
        name="price"
        placeholder="price product"
        value={formik.values.price}
        onChange={formik.handleChange}
        error={formik.errors.price}
      ></Form.Input>
      <Dropdown
        placeholder="Category"
        fluid
        search
        selection
        options={categoriesFormat}
        value={formik.values.category}
        error={formik.errors.category}
        onChange={(_, data) => {
          formik.setFieldValue("category", data.value);
        }}
      />

      <div className="add-edit-product-form__active">
        <Checkbox
          toggle
          checked={formik.values.active}
          onChange={(_, data) => {
            formik.setFieldValue("active", data.checked);
          }}
        />
        Active product
      </div>

      <Button
        type="button"
        fluid
        color={formik.errors.image && "red"}
        {...getRootProps()}
      >
        {previewFile ? "Change Image" : "Upload Image"}
      </Button>
      <input {...getInputProps()} />
      <Image fluid src={previewFile} />

      <Button
        type="submit"
        fluid
        primary
        content={product.create ? "Save" : "Update"}
      />
    </Form>
  );
}

function initialValues(product) {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    category: product.category,
    active: product.active,
    image: "",
  };
}

function validationSchema() {
  return {
    title: Yup.string().required(true),
    image: Yup.string().required(true),
    active: Yup.boolean().required(true),
    category: Yup.number().required(true),
    price: Yup.number().required(true),
  };
}

function validationSchemaUpdate() {
  return {
    title: Yup.string().required(true),
    image: Yup.string(),
    active: Yup.boolean().required(true),
    category: Yup.number().required(true),
    price: Yup.number().required(true),
  };
}

function formatDropdown(data) {
  return map(data, (item) => ({
    key: item.id,
    text: item.title,
    value: item.id,
  }));
}
