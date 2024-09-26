import PropTypes from "prop-types";
import { TodoItem } from "./TodoItem";
import { Button } from "./Button";

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
  function addTodo(data) {
    dispatch({
      type: "todoAdd",
      payload: data,
    });
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
      <li className="rounded bg-gray-300 mb-1  ">
        <Button
          className="w-[100%] block bg-inherit p-2  hover:bg-gray-400 text-black font-bold"
          onClick={() =>
            showModal(<TodoForm submit={addTodo} closeModal={closeModal} />)
          }
        >
          +
        </Button>
      </li>
    </ul>
  );
}

TodoList.propTypes = {
  children: PropTypes.node,
};

export { TodoList };
