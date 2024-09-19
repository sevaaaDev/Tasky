import PropTypes from "prop-types";
import { useState } from "react";
import { Modal } from "./Modal";
import { Form } from "./Form";

function TodoItem({
  item,
  handleDeleteCurry,
  handleEditCurry,
  showModal,
  closeModal,
}) {
  function handleEdit() {
    showModal(
      <Form
        submit={handleEditCurry(item.id)}
        initVal={item.title}
        closeModal={closeModal}
      />,
    );
  }
  return (
    <li>
      {item.title} <button onClick={handleDeleteCurry(item.id)}>Delete</button>
      <button onClick={handleEdit}>Edit</button>
    </li>
  );
}

TodoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string,
  }).isRequired,
  handleDeleteCurry: PropTypes.func.isRequired,
  handleEditCurry: PropTypes.func.isRequired,
};

export { TodoItem };
