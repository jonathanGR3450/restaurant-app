import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import { useUser } from "../../hooks";
import { HeaderPage } from "../../components/Admin";
import { UsersTable, UserForm } from "../../components/Admin/Users";
import { ModalBasic } from "../../components/Common/ModalBasic";

export function UsersAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);

  const { getUsers, loading, users } = useUser();
  const [refetch, setRefetch] = useState(true);

  useEffect(() => {
    getUsers();
  }, [refetch]);

  const openCloseModal = () => setShowModal((prevState) => !prevState);
  const onRefetch = () => setRefetch((prevState) => !prevState);

  const addUser = () => {
    setTitleModal("Add User");
    setContentModal(
      <UserForm onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  return (
    <>
      <HeaderPage
        title="Usuarios"
        btnTitle="Agregar Usuario"
        btnClick={addUser}
      />
      {loading ? (
        <Loader active inline="centered">
          Loading...
        </Loader>
      ) : (
        <UsersTable users={users} />
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
