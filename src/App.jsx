import { useState } from "react";
import { TodoItem } from "./components/TodoItem";
import { TodoList } from "./components/TodoList";
import { Form } from "./components/Form";
import "./App.css";
import { Modal } from "./components/Modal";
import { GroupItem } from "./components/GroupItem";

const initItems = {
  Programming: [
    {
      id: crypto.randomUUID(),
      title: "Learn React Hooks",

      summary: "all hooks",
    },
    {
      id: crypto.randomUUID(),
      title: "Learn React Router",
      summary: "router",
    },
  ],
  Life: [
    {
      id: crypto.randomUUID(),
      title: "Pull UP",

      summary: "yes",
    },
    {
      id: crypto.randomUUID(),
      title: "Fix urself",
      summary: "frog",
    },
  ],
};

function getAllTodo(items) {
  let arr = [];
  for (let key of Object.keys(items)) {
    arr = arr.concat(items[key]);
  }
  return arr;
}

function App() {
  const [items, setItems] = useState(initItems);
  const [currentGroup, setCurrentGroup] = useState("Programming"); // change it to default
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalBody, setModalBody] = useState(null);
  let currentItems = getAllTodo(state);
  if (currentGroup !== "Default") {
    currentItems = state[currentGroup];
  }
  let listOfGroups = Object.keys(items);

  function deleteGroupCurry(id) {
    return (e) => {
      e.stopPropagation();
      let { [id]: _, ...newItems } = items;
      setCurrentGroup("Default");
      setItems(newItems);
    };
  }

  function deleteTodoCurry(id) {
    return () => {
      let newItems = { ...items };
      newItems[currentGroup] = newItems[currentGroup].filter(
        (el) => el.id !== id,
      );
      setItems(newItems);
    };
  }

  function addTodo(title) {
    let newItems = { ...items };
    newItems[currentGroup].push({
      id: crypto.randomUUID(),
      title: title,
      summary: "",
    });
    setItems(newItems);
  }

  function editTodoCurry(todoId) {
    return (val) => {
      let newItems = { ...items };
      newItems[currentGroup] = newItems[currentGroup].map((item) => {
        if (item.id === todoId) {
          item.title = val;
        }
        return item;
      });
      setItems(newItems);
    };
  }

  function editGroupCurry(groupName) {
    return (newGroupName) => {
      let { [groupName]: _, ...newItems } = items;
      newItems[newGroupName] = [...items[groupName]];
      setItems(newItems);
    };
  }

  function changeGroupCurry(groupName) {
    return () => setCurrentGroup(groupName);
  }

  function closeModal() {
    setModalOpen(false);
    setModalBody(null);
  }
  // TODO: form modal
  // TODO: create List component

  function showModal(element) {
    setModalOpen(true);
    setModalBody(element);
  }
  return (
    <>
      <Modal openModal={isModalOpen} handleModal={closeModal}>
        {modalBody}
      </Modal>
      <Form submit={addTodo} label="Todo"></Form>
      <TodoList>
        {currentItems.map((el) => (
          <TodoItem
            key={el.id}
            item={el}
            handleDeleteCurry={deleteTodoCurry}
            handleEditCurry={editTodoCurry}
            showModal={showModal}
            closeModal={closeModal}
          />
        ))}
      </TodoList>
      <hr />
      <TodoList>
        <GroupItem
          groupName="Default"
          setGroupCurry={changeGroupCurry}
          isDefault={true}
        />
        {listOfGroups.map((el) => (
          <GroupItem
            key={el}
            groupName={el}
            handleDeleteCurry={deleteGroupCurry}
            handleEditCurry={editGroupCurry}
            setGroupCurry={changeGroupCurry}
            showModal={showModal}
            closeModal={closeModal}
          />
        ))}
      </TodoList>
    </>
  );
}

export default App;
