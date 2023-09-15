export default class Container {
  
}

function createID() {
  return Math.floor(Math.random() * 100000)
}

export function createProject(container,name) {
  let project = {
    todo: [],
    name,
  }

  container.push(project)
}

export function createTodo(container, projectID, name, description, dueDate, priority) {
  let todo = {
    name,
    description,
    dueDate,
    priority,
    checklist: false,
    id: createID()
  }

  container[projectID].todo.push(todo)
}