import PropTypes from "prop-types";
function TodoItem({ item, handleDeleteCurry }) {
  return (
    <li>
      {item.title} <button onClick={handleDeleteCurry(item.id)}>Delete</button>
    </li>
  );
}

TodoItem.propTypes = {
  item: PropTypes.object,
  handleDeleteCurry: PropTypes.func,
};

export { TodoItem };
