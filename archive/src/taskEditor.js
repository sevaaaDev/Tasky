export function checklist(container, projectIndex, taskIndex) {
  if (container[projectIndex].task[taskIndex].checklist === true) {
    container[projectIndex].task[taskIndex].checklist = false
    return
  }
  container[projectIndex].task[taskIndex].checklist = true
}

export function editTask(container, projectIndex, taskIndex, name, dueDate, desc, priority) {
  container[projectIndex].task[taskIndex].name = name
  container[projectIndex].task[taskIndex].dueDate = dueDate
  container[projectIndex].task[taskIndex].desc = desc
  container[projectIndex].task[taskIndex].priority = priority
}

export function removeTask(container, projectIndex, taskIndex) {
  container[projectIndex].task.splice(taskIndex, 1)
} 
