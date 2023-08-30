import React from "react";
import { Form, Button, Checkbox } from "semantic-ui-react";
import { useFormik } from "formik";
import { useUser } from "../../../../hooks";
import * as Yup from "yup";

import "./UserForm.scss";

export function UserForm(props) {
  const { onClose, onRefetch, user } = props;
  const { addUser, updateUser } = useUser();
  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: Yup.object(
      user.create ? validationSchema() : validationSchemaUpdate()
    ),
    onSubmit: async (formValue) => {
      try {
        if (user.create) {
          await addUser(formValue);
        } else {
          await updateUser(formValue);
        }
        onRefetch();
        onClose();
      } catch (error) {
        console.log(error);
      }
    },
    validateOnChange: false,
  });
  return (
    <Form className="add-edit-user-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        type="text"
        name="username"
        placeholder="username"
        value={formik.values.username}
        error={formik.errors.username}
        onChange={formik.handleChange}
      />
      <Form.Input
        type="email"
        name="email"
        placeholder="email"
        value={formik.values.email}
        error={formik.errors.email}
        onChange={formik.handleChange}
      />
      <Form.Input
        name="first_name"
        placeholder="first name"
        value={formik.values.first_name}
        error={formik.errors.first_name}
        onChange={formik.handleChange}
      />
      <Form.Input
        name="last_name"
        placeholder="last name"
        value={formik.values.last_name}
        error={formik.errors.last_name}
        onChange={formik.handleChange}
      />
      <Form.Input
        type="password"
        name="password"
        placeholder="password"
        value={formik.values.password}
        error={formik.errors.password}
        onChange={formik.handleChange}
      />

      <div className="add-edit-user-form__active">
        <Checkbox
          name="is_active"
          toggle
          checked={formik.values.is_active}
          onChange={(_, data) =>
            formik.setFieldValue("is_active", data.checked)
          }
        />
        Usuario Activo
      </div>

      <div className="add-edit-user-form__staff">
        <Checkbox
          name="is_staff"
          toggle
          checked={formik.values.is_staff}
          onChange={(_, data) => formik.setFieldValue("is_staff", data.checked)}
        />{" "}
        Usuario Staff
      </div>
      <Button
        primary
        fluid
        type="submit"
        content={user.create ? "Save" : "Update"}
      />
    </Form>
  );
}

function initialValues(user) {
  return user;
}

function validationSchema() {
  return {
    username: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    first_name: Yup.string(),
    last_name: Yup.string(),
    password: Yup.string().required(true),
    is_active: Yup.bool().required(true),
    is_staff: Yup.bool().required(true),
  };
}

function validationSchemaUpdate() {
  return {
    username: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    first_name: Yup.string(),
    last_name: Yup.string(),
    password: Yup.string(),
    is_active: Yup.bool().required(true),
    is_staff: Yup.bool().required(true),
  };
}
