export function createProject(container, name) {
  let project = {
    task: [],
    name,
  };

  container.push(project);
}

export function createTask(
  container,
  projectIndex,
  name,
  dueDate,
) {
  let task = {
    name,
    dueDate,
    checklist: false,
    project: projectIndex,
    oriIndex: container[projectIndex].task.length,
  };

  container[projectIndex].task.push(task);
}
