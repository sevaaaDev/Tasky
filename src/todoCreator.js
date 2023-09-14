export default class Container {
  constructor() {
    this.project = {}
  }
}

function createID() {
  return Math.floor(Math.random() * 100000)
}

export function createProject(container,name) {
  let project = {
    todo:{},
    name,
    id: createID()
  }

  container.project[project.id] = project
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

  container.project[projectID].todo[todo.id] = todo
}