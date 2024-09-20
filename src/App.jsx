import { useReducer, useState } from "react";
import { TodoItem } from "./components/TodoItem";
import { TodoList } from "./components/TodoList";
import { Form } from "./components/Form";
import "./App.css";
import { Modal } from "./components/Modal";
import { GroupItem } from "./components/GroupItem";

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

function getAllTodo(items) {
  let arr = [];
  for (let key of Object.keys(items)) {
    arr = arr.concat(items[key]);
  }
  return arr;
}

function reducer(state, action) {
  let { payload, type } = action;
  switch (type) {
    case "todoAdd":
      return {
        ...state,
        [payload.currentGroup]: state[payload.currentGroup].concat(
          newTodo(payload.title),
        ),
      };
    case "todoEdit":
      return todoEdit(state, payload);
    case "todoDelete":
      return todoDelete(state, payload);
    default:
      return state;
  }
}
function newTodo(title) {
  return {
    id: crypto.randomUUID(),
    title: title,
    summary: "",
  };
}

function todoEdit(state, { todoId, title, currentGroup }) {
  let newItems = { ...state };
  newItems[currentGroup] = newItems[currentGroup].map((item) => {
    if (item.id === todoId) {
      item.title = title;
    }
    return item;
  });
  return newItems;
}

function todoDelete(state, { todoId, currentGroup }) {
  // BUG: if delete on default group, it will error (bcs dont know which currentGroup)
  let newItems = { ...state };
  newItems[currentGroup] = newItems[currentGroup].filter(
    (el) => el.id !== todoId,
  );
  return newItems;
}
// TODO: learn about useReducer
function App() {
  const [items, setItems] = useState(initItems);
  const [currentGroup, setCurrentGroup] = useState("Programming"); // change it to default
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalBody, setModalBody] = useState(null);
  const [state, dispatch] = useReducer(reducer, initItems);
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

  function deleteTodoCurry(todoId) {
    return () => {
      dispatch({
        type: "todoDelete",
        payload: {
          todoId,
          currentGroup,
        },
      });
    };
  }

  function addTodo(title) {
    dispatch({
      type: "todoAdd",
      payload: {
        title,
        currentGroup,
      },
    });
  }

  function editTodoCurry(todoId) {
    return (title) => {
      dispatch({
        type: "todoEdit",
        payload: {
          currentGroup,
          todoId,
          title,
        },
      });
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
