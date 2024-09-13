import PropTypes from "prop-types";
function GroupItem({ group, handleDeleteCurry }) {
  return (
    <li>
      {group} <button onClick={handleDeleteCurry(group)}>delete</button>
    </li>
  );
}

GroupItem.propTypes = {
  group: PropTypes.string,
  handleDeleteCurry: PropTypes.func,
};

export { GroupItem };
