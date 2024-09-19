import PropTypes from "prop-types";
import { Form } from "./Form";

function GroupItem({
  groupName,
  handleDeleteCurry,
  handleEditCurry,
  setGroupCurry,
  showModal,
  closeModal,
  isDefault,
}) {
  function handleEdit(e) {
    e.stopPropagation();
    // BUG: when editing current group, it will error bcs the group disappear/changed (like deleting group)
    showModal(
      <Form
        submit={handleEditCurry(groupName)}
        initVal={groupName}
        closeModal={closeModal}
      />,
    );
  }

  return (
    <li onClick={setGroupCurry(groupName)}>
      {groupName}
      {!isDefault && (
        <button onClick={handleDeleteCurry(groupName)}>Delete</button>
      )}
      {!isDefault && <button onClick={handleEdit}>Edit</button>}
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
