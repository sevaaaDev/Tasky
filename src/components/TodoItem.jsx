function TodoItem({ item }) {
  return (
    <li>
      {item.title} <button onClick={handleDelete(item.id)}>Delete</button>
    </li>
  );
}

export { TodoItem };
