export function checklist(container, projectID, todoID) {
  if (container.project[projectID].todo[todoID].checklist === true) {
    container.project[projectID].todo[todoID].checklist = false
    return
  }
  container.project[projectID].todo[todoID].checklist = true
}

export function editTodo(container, projectID, todoID, name, description, dueDate, priority) {
  container.project[projectID].todo[todoID].name = name
  container.project[projectID].todo[todoID].description = description
  container.project[projectID].todo[todoID].dueDate = dueDate
  container.project[projectID].todo[todoID].priority = priority
}