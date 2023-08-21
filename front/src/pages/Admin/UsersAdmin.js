import React, { useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { useUser } from "../../hooks";
import { HeaderPage } from "../../components/Admin";
import { UsersTable } from "../../components/Admin/Users/UsersTable";

export function UsersAdmin() {
  const { getUsers, loading, users } = useUser();

  console.log(loading);
  console.log(users);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <HeaderPage title="Usuarios" btnTitle="Agregar Usuario" />
      {loading ? (
        <Loader active inline="centered">
          Loading...
        </Loader>
      ) : (
        <UsersTable users={users} />
      )}
    </>
  );
}
