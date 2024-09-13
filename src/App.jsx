import { useState } from "react";
import { TodoItem } from "./components/TodoItem";
import { TodoList } from "./components/TodoList";
import { Form } from "./components/Form";
import "./App.css";
import { GroupItem } from "./components/GroupItem";

const initItems = {
  Default: [],
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
  Life: [],
};
function App() {
  const [items, setItems] = useState(initItems);
  const [currentGroup, setCurrentGroup] = useState("Programming"); // change it to default
  let currentItems = items[currentGroup];
  let listOfGroups = Object.keys(items);

  function deleteGroupCurry(id) {
    return () => {
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
  return (
    <>
      <Form submit={addTodo} label="Todo"></Form>
      <TodoList>
        {currentItems.map((el) => (
          <TodoItem key={el.id} item={el} handleDeleteCurry={deleteTodoCurry} />
        ))}
      </TodoList>
      <hr />
      <TodoList>
        {listOfGroups.map((el) => (
          <GroupItem key={el} group={el} handleDeleteCurry={deleteGroupCurry} />
        ))}
      </TodoList>
    </>
  );
}

export default App;