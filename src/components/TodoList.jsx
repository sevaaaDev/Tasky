import PropTypes from "prop-types";
function TodoList({ children }) {
  return <ul className="Todo-List">{children}</ul>;
}

TodoList.propTypes = {
  children: PropTypes.node,
};

export { TodoList };
