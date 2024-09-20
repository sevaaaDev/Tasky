import { useReducer, useState } from "react";
import { TodoItem } from "./components/TodoItem";
import { TodoList } from "./components/TodoList";
import { Form } from "./components/Form";
import "./App.css";
import { Modal } from "./components/Modal";
import { GroupItem } from "./components/GroupItem";
import "./App.css";

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

// TODO: change state structure means change everything

function reducer(state, action) {
  let { payload, type } = action;
  switch (type) {
    case "todoAdd":
      return {
        ...state,
        todos: todoAdd(state.todos, payload),
      };
    case "todoEdit":
      return {
        ...state,
        todos: todoEdit(state.todos, payload),
      };
    case "todoDelete":
      return {
        ...state,
        todos: todoDelete(state.todos, payload),
      };
    case "groupDelete":
      return groupDelete(state, payload);
    case "groupEdit":
      return groupEdit(state, payload);
    default:
      return state;
  }
}

function groupDelete(state, { groupName }) {
  let newState = { ...state };
  newState.groups = newState.groups.filter((group) => group !== groupName);
  newState.todos = todoDeleteByGroup(newState.todos, groupName);
  return newState;
}
function todoDeleteByGroup(todos, groupName) {
  return todos.filter((todo) => todo.group !== groupName);
}

function groupEdit(state, { newGroupName, groupName }) {
  let newState = { ...state };
  newState.groups = newState.groups.map((group) => {
    if (group === groupName) {
      return newGroupName;
    }
    return group;
  });
  newState.todos = changeTodoGroup(newState.todos, { newGroupName, groupName });
  return newState;
}
function changeTodoGroup(todos, { newGroupName, groupName }) {
  return todos.map((todo) => {
    if (todo.group === groupName) {
      todo.group = newGroupName;
    }
    return todo;
  });
}

function todoAdd(todos, { title, group }) {
  return [
    ...todos,
    {
      id: crypto.randomUUID(),
      title: title,
      summary: "",
      group: group,
    },
  ];
}

function todoEdit(todos, { todoId, title }) {
  return todos.map((item) => {
    if (item.id === todoId) {
      item.title = title;
    }
    return item;
  });
}

function todoDelete(todos, { todoId }) {
  return todos.filter((el) => el.id !== todoId);
}

function App() {
  const [items, setItems] = useState(initItems);
  const [currentGroup, setCurrentGroup] = useState("Default"); // change it to default
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalBody, setModalBody] = useState(null);
  const [state, dispatch] = useReducer(reducer, initItems);
  let currentItems = [...state.todos];
  if (currentGroup !== "Default") {
    currentItems = state.todos.filter((todo) => todo.group === currentGroup);
  }
  let listOfGroups = [...state.groups];

  function deleteGroupCurry(id) {
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

  function deleteTodoCurry(todoId) {
    return () => {
      dispatch({
        type: "todoDelete",
        payload: {
          todoId,
        },
      });
    };
  }

  function addTodo(title) {
    dispatch({
      type: "todoAdd",
      payload: {
        title,
        group: currentGroup,
      },
    });
  }

  function editTodoCurry(todoId) {
    return (title) => {
      dispatch({
        type: "todoEdit",
        payload: {
          todoId,
          title,
        },
      });
    };
  }

  function editGroupCurry(groupName) {
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
