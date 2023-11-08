import React, { useEffect, useState } from "react";
import useTable from "../../hooks/useTable";
import { HeaderPage } from "../../components/Admin";
import { ModalBasic } from "../../components/Common/ModalBasic";
import { TablesTable } from "../../components/Admin/Tables/TablesTable/TablesTable";
import { Loader } from "semantic-ui-react";
import { TableForm } from "../../components/Admin/Tables/TableForm/TableForm";

export function TablesAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);

  const [refetch, setRefetch] = useState(true);
  const { loading, tables, getTables, deleteTable } = useTable();

  useEffect(() => {
    getTables();
  }, [refetch]);

  const openCloseModal = () => setShowModal((prevState) => !prevState);
  const onRefetch = () => setRefetch((prevState) => !prevState);

  const addTable = () => {
    const table = {
      id: 0,
      number: "",
      create: true,
    };
    setTitleModal("Add Table");
    setContentModal(
      <TableForm table={table} onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updateTable = (table) => {
    table = { ...table, create: false };
    setTitleModal("Update Table");
    setContentModal(
      <TableForm table={table} onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const onDeleteTable = async (table) => {
    try {
      const result = window.confirm(
        `Are you sure you want to delete ${table.number} table?`
      );
      console.log(result);
      if (result) {
        await deleteTable(table);
        onRefetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <HeaderPage title="Mesas" btnTitle="Agregar Mesa" btnClick={addTable} />
      {loading ? (
        <Loader active inline="centered">
          Loading...
        </Loader>
      ) : (
        <TablesTable
          tables={tables}
          updateTable={updateTable}
          onDeleteTable={onDeleteTable}
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
