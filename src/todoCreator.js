export function createProject(container,name) {
  let project = {
    todo: [],
    name,
  }

  container.push(project)
}

export function createTodo(container, projectIndex, name, description, dueDate, priority) {
  let todo = {
    name,
    description,
    dueDate,
    priority,
    checklist: false,
  }

  container[projectIndex].todo.push(todo)
}