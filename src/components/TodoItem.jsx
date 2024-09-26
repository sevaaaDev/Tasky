import PropTypes from "prop-types";
import { Button } from "./Button";
import { TodoForm } from "./TodoFormModal";

function TodoItem({
  item,
  handleDeleteCurry,
  handleEditCurry,
  showModal,
  closeModal,
}) {
  function handleEdit() {
    showModal(
      <TodoForm
        submit={handleEditCurry(item.id)}
        defaultVal={{
          title: item.title,
          group: item.group,
        }}
        closeModal={closeModal}
      />,
    );
  }
  return (
    <li className="p-2 rounded bg-gray-200 mb-1 flex">
      {item.title}
      <Button className="ml-auto mr-1" onClick={handleEdit}>
        Edit
      </Button>
      <Button onClick={handleDeleteCurry(item.id)}>Delete</Button>
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
