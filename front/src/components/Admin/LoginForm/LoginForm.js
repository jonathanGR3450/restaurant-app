import React from "react";
import { Button, Form } from "semantic-ui-react";
import "./LoginForm.scss";

export function LoginForm() {
  return (
    <Form className="login-form-admin">
      <Form.Input name="email" placeholder="email" />
      <Form.Input name="password" type="password" placeholder="password" />
      <Button type="submit" content="Login" primary fluid />
    </Form>
  );
}
