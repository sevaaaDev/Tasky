export function createProject(container, name) {
  let project = {
    task: [],
    name,
    ID: generateID()
  };

  container.push(project);
}

export function createTask(
  container,
  projectIndex,
  name,
  dueDate,
  description,
  priority
) {
  let task = {
    name,
    dueDate: dueDate,
    desc: description,
    priority: priority,
    checklist: false,
    project: container[projectIndex].ID,
    ID: generateID()
  };

  container[projectIndex].task.push(task);
}

export function getTaskIndex(container, projectIndex, taskID) {
  for (let elem of container[projectIndex].task) {
    if (elem.ID === +taskID) {
      return container[projectIndex].task.indexOf(elem)
    }
  }
}

export function getProjectIndex(container, projectID) {
  for (let elem of container) {
    if (elem.ID === +projectID) {
      return +container.indexOf(elem)
    }
  }
  return projectID
}

function generateID() {
  return Math.floor(Math.random() * 9999)
}
