import React from "react";
import * as Yup from "yup";

import "./TableForm.scss";
import useTable from "../../../../hooks/useTable";
import { useFormik } from "formik";
import { Button, Form } from "semantic-ui-react";

export function TableForm(props) {
  const { table, onClose, onRefetch } = props;
  const { updateTable, saveTable } = useTable();

  const formik = useFormik({
    initialValues: initialValues(table),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (table.create) {
          await saveTable(formValue);
        } else {
          await updateTable(formValue);
        }
        onRefetch();
        onClose();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Form className="add-edit-table-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="number"
        type="numeric"
        placeholder="number table"
        value={formik.values.number}
        onChange={formik.handleChange}
        error={formik.errors.number}
      />
      <Button
        type="submit"
        fluid
        primary
        content={table.create ? "Save" : "Update"}
      />
    </Form>
  );
}

function initialValues(table) {
  return {
    id: table.id,
    number: table.number,
  };
}

function validationSchema() {
  return {
    number: Yup.number().required(true),
  };
}
