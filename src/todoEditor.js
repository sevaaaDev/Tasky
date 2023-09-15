export function checklist(container, projectID, todoID) {
  if (container[projectID][todoID].checklist === true) {
    container[projectID][todoID].checklist = false
    return
  }
  container[projectID][todoID].checklist = true
}

export function editTodo(container, projectID, todoID, name, description, dueDate, priority) {
  container[projectID][todoID].name = name
  container[projectID][todoID].description = description
  container[projectID][todoID].dueDate = dueDate
  container[projectID][todoID].priority = priority
}

export function removeTodo(container, projectID, todoID) {
  delete container[projectID][todoID]
}