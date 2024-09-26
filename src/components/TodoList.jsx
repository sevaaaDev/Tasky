import PropTypes from "prop-types";
import { TodoItem } from "./TodoItem";

function TodoList({ items, dispatch, showModal, closeModal }) {
  function onDelete(todoId) {
    return () => {
      dispatch({
        type: "todoDelete",
        payload: {
          todoId,
        },
      });
    };
  }
  function onEdit(todoId) {
    return ({ title, group }) => {
      dispatch({
        type: "todoEdit",
        payload: {
          todoId,
          title,
          group,
        },
      });
    };
  }
  return (
    <ul className="col-span-9">
      {items.map((el) => (
        <TodoItem
          key={el.id}
          item={el}
          handleDeleteCurry={onDelete}
          handleEditCurry={onEdit}
          showModal={showModal}
          closeModal={closeModal}
        />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  children: PropTypes.node,
};

export { TodoList };
