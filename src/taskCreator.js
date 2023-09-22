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
) {
  let task = {
    name,
    dueDate: new Date(dueDate),
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
      return container.indexOf(elem)
    }
  }
  console.log('Something is wrong')
  return projectID
}

function generateID() {
  return Math.floor(Math.random() * 9999)
}