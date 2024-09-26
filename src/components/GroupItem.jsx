import PropTypes from "prop-types";
import { Form } from "./Form";
import { GroupForm } from "./GroupForm";
import { Button } from "./Button";

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
    showModal(
      <GroupForm
        defaultVal={{ group: groupName }}
        submit={handleEditCurry(groupName)}
        closeModal={closeModal}
      />,
    );
  }

  return (
    <li
      onClick={setGroupCurry(groupName)}
      className="p-2 bg-gray-200 mb-1 flex"
    >
      {groupName}
      {!isDefault && (
        <Button className="ml-auto mr-1" onClick={handleEdit}>
          Edit
        </Button>
      )}
      {!isDefault && (
        <Button onClick={handleDeleteCurry(groupName)}>Delete</Button>
      )}
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
