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

// TODO: put the logic on separate component
// rethink everything
const initItems = {
  todos: [
    {
      id: crypto.randomUUID(),
      title: "Learn React Hooks",
      summary: "all hooks",
      group: "Programming",
    },
    {
      id: crypto.randomUUID(),
      title: "Learn React Router",
      summary: "router",
      group: "Programming",
    },
    {
      id: crypto.randomUUID(),
      title: "Pull UP",
      summary: "yes",
      group: "Life",
    },
    {
      id: crypto.randomUUID(),
      title: "Fix urself",
      summary: "frog",
      group: "Life",
    },
  ],
  groups: ["Programming", "Life"],
};

// TODO: create add todo form
// TODO: create add group form
// TODO: rethink modal

function App() {
  const [currentGroup, setCurrentGroup] = useState("Default"); // change it to default
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalBody, setModalBody] = useState(null);
  const [state, dispatch] = useReducer(reducer, initItems);
  let currentItems = [...state.todos];
  if (currentGroup !== "Default") {
    currentItems = state.todos.filter((todo) => todo.group === currentGroup);
  }
  function addTodo({ title, group }) {
    dispatch({
      type: "todoAdd",
      payload: {
        title,
        group,
      },
    });
  }
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
      <Button
        onClick={() =>
          showModal(<TodoForm submit={addTodo} closeModal={closeModal} />)
        }
      >
        Add TODO
      </Button>
    </div>
  );
}

export default App;
