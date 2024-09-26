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
  let className = "p-2 rounded bg-gray-200 mb-1 flex";
  if (item.priority === "3") {
    className += " border-l-red-500 border-l-[4px]";
  } else if (item.priority === "2") {
    className += " border-l-yellow-500 border-l-[4px]";
  } else {
    className += " border-l-blue-300 border-l-[4px]";
  }
  return (
    <li className={className}>
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
    description: PropTypes.string,
    done: PropTypes.bool,
    priority: PropTypes.string,
    dueDate: PropTypes.string,
  }).isRequired,
  handleDeleteCurry: PropTypes.func.isRequired,
  handleEditCurry: PropTypes.func.isRequired,
};

export { TodoItem };
