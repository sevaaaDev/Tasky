import PropTypes from "prop-types";
function GroupItem({
  groupName,
  handleDeleteCurry,
  handleEditCurry,
  setGroupCurry,
}) {
  return (
    <li onClick={setGroupCurry(groupName)}>
      {groupName} <button onClick={handleDeleteCurry(groupName)}>Delete</button>
      <button onClick={handleEditCurry(groupName)}>Edit</button>
    </li>
  );
}

GroupItem.propTypes = {
  groupName: PropTypes.string.isRequired,
  handleDeleteCurry: PropTypes.func.isRequired,
  handleEditCurry: PropTypes.func.isRequired,
  setGroupCurry: PropTypes.func.isRequired,
};

export { GroupItem };
