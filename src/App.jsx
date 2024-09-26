import { useReducer, useState } from "react";
import { TodoItem } from "./components/TodoItem";
import { TodoList } from "./components/TodoList";
import { GroupList } from "./components/GroupList";
import { Form } from "./components/Form";
import { Modal } from "./components/Modal";
import { GroupItem } from "./components/GroupItem";
import "./App.css";
import { TodoForm } from "./components/TodoFormModal";
import { Button } from "./components/Button";
import reducer from "./reducer";

// rethink everything
const initItems = {
  todos: [
    {
      id: crypto.randomUUID(),
      title: "Learn React Hooks",
      priority: "1",
      group: "Programming",
    },
    {
      id: crypto.randomUUID(),
      title: "Learn React Router",
      priority: "2",
      group: "Programming",
    },
    {
      id: crypto.randomUUID(),
      title: "Pull UP",
      priority: "3",
      group: "Life",
    },
    {
      id: crypto.randomUUID(),
      title: "Fix urself",
      priority: "3",
      group: "Life",
    },
  ],
  groups: ["Programming", "Life"],
};

// TODO: create add group form

function App() {
  const [currentGroup, setCurrentGroup] = useState("Default"); // change it to default
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalBody, setModalBody] = useState(null);
  const [state, dispatch] = useReducer(reducer, initItems);
  let currentItems = [...state.todos];
  if (currentGroup !== "Default") {
    currentItems = state.todos.filter((todo) => todo.group === currentGroup);
  }
  //currentItems.sort((a, b) => Number(b.priority) - Number(a.priority));
  currentItems.sort((a, b) => (a.title > b.title ? 1 : -1));
  function changeGroupCurry(groupName) {
    return () => setCurrentGroup(groupName);
  }
  function closeModal() {
    setModalOpen(false);
    setModalBody(null);
  }
  function showModal(element) {
    setModalOpen(true);
    setModalBody(element);
  }

  return (
    <div className="grid grid-cols-12">
      <Modal openModal={isModalOpen} handleModal={closeModal}>
        {modalBody}
      </Modal>
      <header className="row-start-1 row-end-2 col-span-12 bg-black">
        <h1 className="text-white font-bold text-3xl">TODO APP</h1>
      </header>
      <GroupList
        items={state.groups}
        dispatch={dispatch}
        onChangeGroup={changeGroupCurry}
        showModal={showModal}
        closeModal={closeModal}
      />
      <TodoList
        items={currentItems}
        dispatch={dispatch}
        showModal={showModal}
        closeModal={closeModal}
      />
    </div>
  );
}

export default App;
