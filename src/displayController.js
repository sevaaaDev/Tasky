export function displayTaskToDOM(container, projectIndex) {
  if (projectIndex === 'all') {
    displayAllTask(container)
    return
  }
  resetTaskDisplay();
  const taskContainer = document.querySelector(".main--task-container");
  for (let task of container[projectIndex].task) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.setAttribute("data-index", task["oriIndex"]);
    taskElement.innerText = `${task["name"]}`;
    taskContainer.append(taskElement);
  }
}

function displayAllTask(container) {
  resetTaskDisplay()
  const taskContainer = document.querySelector('.main--task-container')
  for(let project of container) {
    for(let task of project.task) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.setAttribute("data-index", task["oriIndex"]);
    taskElement.innerText = `${task["name"]}`;
    taskContainer.append(taskElement);
    }
  }
}

function resetTaskDisplay() {
  const taskContainer = document.querySelector(".main--task-container");
  taskContainer.innerHTML = "";
}

function resetProjectDisplay() {
  const projectContainer = document.querySelector(".project-container");
  projectContainer.innerHTML = "";
}

export function selectDOM(selector) {
  return document.querySelector(selector);
}

export function displayProjectToDOM(container, projectIndex) {
  const projectContainer = document.querySelector(".nav--project-container");
  const div = document.createElement("div");
  const icon = document.createElement("img");
  icon.setAttribute("src", "icons/folder.svg");
  div.append(icon, container[projectIndex]["name"]);
  div.setAttribute("data-index", projectIndex);
  div.classList.add("project");
  projectContainer.append(div);
}

export function highlightSelected(e) {
  const btnFilter = document.querySelectorAll('nav [class*="button"]');
  const btnProject = document.querySelectorAll(
    'nav .nav--project-container [class*="project"]'
  );
  resetHighlighting(btnProject);
  resetHighlighting(btnFilter);
  if (e.target.className !== "project") {
    for (let btn of btnFilter) {
      if (e.target.className === btn.className) {
        btn.classList.add("selected");
      }
    }
    return;
  }
  e.target.classList.add("selected");
}

function resetHighlighting(nodelist) {
  for (let elem of nodelist) {
    elem.classList.remove("selected");
  }
}

export function showFormProject(e) {
  const btnAddProject = document.querySelector(
    '[class*="button--add-project"]'
  );
  if (e.target === btnAddProject) {
    const formProject = document.querySelector('[class*="form--add-project"]');
    const input = formProject.querySelector("input");
    formProject.classList.add("form--add-project");
    btnAddProject.classList.add("button--add-project__invisible");
    btnAddProject.classList.remove("button--add-project");
    input.focus();
    return;
  }
  const btnAddTask = document.querySelector('[class*="button--add-task"]');
  const formTask = document.querySelector('[class*="form--add-task"]');
  const input = formTask.querySelector("input");
  formTask.classList.add("form--add-task");
  btnAddTask.classList.add("button--add-task__invisible");
  btnAddTask.classList.remove("button--add-task");
  input.focus();
}

export function cancelAdd(type) {
  const form = document.querySelector(`[class*="form--add-${type}"]`);
  const btnAdd = document.querySelector(`[class*="button--add-${type}"]`);
  const input = form.querySelector("input");
  input.value = "";
  form.classList.remove(`form--add-${type}`);
  btnAdd.classList.add(`button--add-${type}`);
}
