export default function reducer(state, action) {
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

function todoAdd(todos, { title, group, priority, done, dueDate }) {
  return [
    ...todos,
    {
      id: crypto.randomUUID(),
      title,
      description: "",
      priority,
      done,
      dueDate,
      group,
    },
  ];
}

function todoEdit(todos, { todoId, title, group }) {
  return todos.map((item) => {
    if (item.id === todoId) {
      item.title = title;
      item.group = group;
    }
    return item;
  });
}

function todoDelete(todos, { todoId }) {
  return todos.filter((el) => el.id !== todoId);
}
