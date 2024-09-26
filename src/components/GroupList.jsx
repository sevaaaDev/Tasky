import { GroupItem } from "./GroupItem";

function GroupList({ items, onChangeGroup, showModal, closeModal }) {
  function onDelete(id) {
    return (e) => {
      e.stopPropagation();
      dispatch({
        type: "groupDelete",
        payload: {
          groupName: id,
        },
      });
      if (currentGroup === id) {
        setCurrentGroup("Default");
      }
    };
  }
  function onEdit(groupName) {
    return (newGroupName) => {
      dispatch({
        type: "groupEdit",
        payload: {
          groupName,
          newGroupName,
        },
      });
      if (currentGroup === groupName) {
        setCurrentGroup(newGroupName);
      }
    };
  }
  return (
    <ul className="col-span-3">
      <GroupItem
        groupName="Default"
        setGroupCurry={onChangeGroup}
        isDefault={true}
      />
      {items.map((el) => (
        <GroupItem
          key={el}
          groupName={el}
          handleDeleteCurry={onDelete}
          handleEditCurry={onEdit}
          setGroupCurry={onChangeGroup}
          showModal={showModal}
          closeModal={closeModal}
        />
      ))}
    </ul>
  );
}

export { GroupList };
