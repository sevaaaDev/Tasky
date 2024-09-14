import PropTypes from "prop-types";
function TodoItem({ item, handleDeleteCurry, handleEditCurry }) {
  return (
    <li>
      {item.title} <button onClick={handleDeleteCurry(item.id)}>Delete</button>
      <button onClick={handleEditCurry(item)}>Edit</button>
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
