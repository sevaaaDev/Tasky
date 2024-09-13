export function resetTaskDisplay() {
  const taskContainer = document.querySelector(".main--task-container");
  taskContainer.innerHTML = "";
}

export function resetProjectDisplay() {
  const projectContainer = document.querySelector('.nav--project-container')
  projectContainer.innerHTML = ''
}