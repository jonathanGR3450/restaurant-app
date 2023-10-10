import React, { useCallback, useState } from "react";
import { Form, Button, Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCategory } from "../../../../hooks";
import "./CategoryForm.scss";

export function CategoryForm(props) {
  const { category, onClose, onRefetch } = props;
  const [previewFile, setPreviewFile] = useState(category.image);

  const { saveCategory, updateCategory } = useCategory();

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    await formik.setFieldValue("image", file);
    setPreviewFile(URL.createObjectURL(file));
  }, []);

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
    initialValues: initialValues(category),
    validationSchema: Yup.object(
      category.create ? validationSchema() : validationSchemaUpdate()
    ),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (category.create) {
          const response = await saveCategory(formValue);
        } else {
          const response = await updateCategory(formValue);
          console.log("update");
          console.log(formValue);
        }
        onRefetch();
        onClose();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Form className="add-edit-category-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        placeholder="name category"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.errors.title}
      />
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
        content={category.create ? "Save" : "Update"}
      />
    </Form>
  );
}

function initialValues(category) {
  return {
    id: category.id,
    title: category.title,
    image: "",
  };
}

function validationSchema() {
  return {
    title: Yup.string().required(true),
    image: Yup.string().required(true),
  };
}

function validationSchemaUpdate() {
  return {
    title: Yup.string().required(true),
    image: Yup.string(),
  };
}
