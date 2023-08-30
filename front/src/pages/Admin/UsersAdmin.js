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

  const { getUsers, loading, users, deleteUser } = useUser();
  const [refetch, setRefetch] = useState(true);

  useEffect(() => {
    getUsers();
  }, [refetch]);

  const openCloseModal = () => setShowModal((prevState) => !prevState);
  const onRefetch = () => setRefetch((prevState) => !prevState);

  const addUser = () => {
    const user = {
      username: "",
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      is_active: true,
      is_staff: false,
      create: true,
    };
    setTitleModal("Add User");
    setContentModal(
      <UserForm onClose={openCloseModal} onRefetch={onRefetch} user={user} />
    );
    openCloseModal();
  };

  const updateUser = (user) => {
    user = { ...user, create: false };
    setTitleModal("Update User");
    setContentModal(
      <UserForm onClose={openCloseModal} onRefetch={onRefetch} user={user} />
    );
    openCloseModal();
  };

  const onDeleteUser = async (user) => {
    const result = window.confirm(
      `Are you sure you want to delete ${user.email} user?`
    );
    if (result) {
      try {
        await deleteUser(user);
        onRefetch();
      } catch (error) {
        console.log(error);
      }
    }
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
        <UsersTable
          users={users}
          updateUser={updateUser}
          onDeleteUser={onDeleteUser}
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
