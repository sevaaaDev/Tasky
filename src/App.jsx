import { useState } from "react";
import "./App.css";

const initItems = {
  Programming: [
    {
      id: crypto.randomUUID(),
      title: "Learn React Hooks",

      summary: "all hooks",
    },
    {
      title: "Learn React Router",
      summary: "router",
    },
  ],
};
function App() {
  const [items, setItems] = useState(initItems);
  const [currentGroup, setCurrentGroup] = useState("Programming"); // change it to default
  let currentItems = items[currentGroup];
  return (
    <>
      <TodoList items={currentItems} />
    </>
  );
}
function TodoList({ items }) {
  return (
    <ul className="Todo-List">
      {items.map((el) => (
        <li key={el.id}>{el.title}</li>
      ))}
    </ul>
  );
}

export default App;
