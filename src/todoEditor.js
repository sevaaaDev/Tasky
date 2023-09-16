export function checklist(container, projectIndex, todoIndex) {
  if (container[projectIndex].todo[todoIndex].checklist === true) {
    container[projectIndex].todo[todoIndex].checklist = false
    return
  }
  container[projectIndex].todo[todoIndex].checklist = true
}

export function editTodo(container, projectIndex, todoIndex, name, description, dueDate, priority) {
  container[projectIndex].todo[todoIndex].name = name
  container[projectIndex].todo[todoIndex].description = description
  container[projectIndex].todo[todoIndex].dueDate = dueDate
  container[projectIndex].todo[todoIndex].priority = priority
}

export function removeTodo(container, projectIndex, todoIndex) {
  container[projectIndex].todo.splice(todoIndex, 1)
}