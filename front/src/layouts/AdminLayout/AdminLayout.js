import React from "react";
import { HomeAdmin } from "../../pages/Admin";

export function AdminLayout(props) {
  const { children } = props;
  const auth = null;

  if (auth) return <HomeAdmin />;
  return (
    <div>
      <p>AdminLayout</p>
      {children}
    </div>
  );
}
