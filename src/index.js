import {
  createProject,
  createTask,
  getProjectIndex,
  getTaskIndex,
} from "./taskCreator.js";
import { checklist, editTask, removeTask } from "./taskEditor.js";
import { displayTaskToDOM } from "./displayController/displayTask.js";
import { displayProjectToDOM } from "./displayController/displayProject.js";
import {
  showFormProject,
  cancelAdd,
} from "./displayController/addTaskOrProject.js";
import {
  checklistTaskDOM,
  removeTaskDOM,
  editTaskDOM,
} from "./displayController/editTask.js";
import {
  changeCategoryHeading,
  highlightSelected,
  toggleNavBar,
} from "./displayController/displayBehavior.js";
import { removeProject } from "./projectEditor.js";
import { removeProjectDOM } from "./displayController/editProject.js";
import { displayMenuToDOM, hideMenu } from "./displayController/displayMenu.js";

let container = [];
let currentProject = 0;
if (!localStorage.getItem("container")) {
  createNewProject(container, "Study");
} else {
  container = JSON.parse(localStorage.getItem("container"));
  displayProjectToDOM(container);
}
selected(undefined, "All Tasks");

function addGlobalEventListener(type, selector, callback) {
  document.addEventListener(type, (e) => {
    if (e.target.matches(selector)) {
      callback(e);
    }
  });
}
addGlobalEventListener("click", ".button--all-tasks", selected);
addGlobalEventListener("click", ".button--today-tasks", selected);
addGlobalEventListener("click", ".button--thisweek-tasks", selected);
addGlobalEventListener("click", "nav .project", selected);
addGlobalEventListener("click", ".button--add-project", showFormProject);
addGlobalEventListener(
  "click",
  "nav .button--x",
  cancelAdd.bind(null, "project"),
);
addGlobalEventListener(
  "click",
  "nav .button--x svg",
  cancelAdd.bind(null, "project"),
);
addGlobalEventListener("click", "nav .button--check", formProject);
addGlobalEventListener("click", "nav .button--check svg", formProject);
addGlobalEventListener("submit", "nav form", formProject);
addGlobalEventListener("click", ".button--add-task", showFormProject);
addGlobalEventListener("click", "main form .button--check", formTask);
addGlobalEventListener("click", "main form .button--check svg", formTask);
addGlobalEventListener("submit", "main form", formTask);
addGlobalEventListener(
  "click",
  "main form .button--x",
  cancelAdd.bind(null, "task"),
);
addGlobalEventListener(
  "click",
  "main form .button--x svg",
  cancelAdd.bind(null, "task"),
);
addGlobalEventListener("click", ".button--status img", checklistTheTask);
addGlobalEventListener("click", ".menu--delete", removeTheTask);
addGlobalEventListener("click", ".menu--edit", editTheTask);
addGlobalEventListener(
  "click",
  "main .main--task-container .button--check",
  submitEditedTask,
);
addGlobalEventListener(
  "click",
  "main .main--task-container .button--x",
  cancelEdit,
);
addGlobalEventListener("click", ".btn--delete-project", removeTheProject);
addGlobalEventListener("click", ".hamburger", toggleNavBar);
addGlobalEventListener("click", ".menu--container img", displayMenu);
document.addEventListener("click", (e) => {
  if (e.target.matches(".menu--container img")) {
    return;
  }
  if (document.querySelector(".menu")) {
    hideMenu();
  }
  return;
});

if (window.screen.width > 768) {
  toggleNavBar();
}

function displayMenu(e) {
  let menuContainer = e.target.closest(".menu--container");
  displayMenuToDOM(menuContainer, container, currentProject);
  if (document.querySelector("main .form--add-task")) {
    cancelAdd("task");
  }
}

function createNewProject(container, name) {
  createProject(container, name);
  localStorage.setItem("container", JSON.stringify(container));
  displayProjectToDOM(container);
  console.log(container[currentProject]);
  if (container[currentProject] !== undefined) {
    highlightSelected(undefined, container[currentProject].ID);
  }
}

function formProject(e) {
  e.preventDefault();
  const input = document.querySelector("nav form input");
  createNewProject(container, input.value);
  cancelAdd("project");
}

function formTask(e) {
  e.preventDefault();
  const inputTitle = document.querySelector("main form input");
  const inputDate = document.querySelector('main form input[type="date"]');
  const inputDesc = document.querySelector("main form textarea");
  const priority = document.querySelector("main form select");
  createTask(
    container,
    currentProject,
    inputTitle.value,
    inputDate.value,
    inputDesc.value,
    priority.value,
  );
  localStorage.setItem("container", JSON.stringify(container));
  displayTaskToDOM(container, currentProject);
  console.log(container);
  cancelAdd("task");
}

function selected(e, custom) {
  let projectIndex = getProjectIndex(container, custom);
  if (e !== undefined) {
    projectIndex = getProjectIndex(container, e.target.dataset.index);
  }
  if (currentProject === projectIndex) return;
  currentProject = projectIndex;
  highlightSelected(e, custom);
  cancelAdd("task");
  changeCategoryHeading(container, currentProject);
  displayTaskToDOM(container, currentProject);
}

function checklistTheTask(e) {
  const task = e.target.closest(".task");
  checklist(
    container,
    getProjectIndex(container, task.dataset.project),
    getTaskIndex(
      container,
      getProjectIndex(container, task.dataset.project),
      task.dataset.index,
    ),
  );
  checklistTaskDOM(task.dataset.project, task.dataset.index);
  localStorage.setItem("container", JSON.stringify(container));
}

function removeTheTask(e) {
  console.log("got?");
  const task = e.target.closest(".task");
  removeTask(
    container,
    getProjectIndex(container, task.dataset.project),
    getTaskIndex(
      container,
      getProjectIndex(container, task.dataset.project),
      task.dataset.index,
    ),
  );
  displayTaskToDOM(container, currentProject);
  localStorage.setItem("container", JSON.stringify(container));
}

function editTheTask(e) {
  const task = e.target.closest(".task");
  editTaskDOM(
    container,
    currentProject,
    getProjectIndex(container, task.dataset.project),
    getTaskIndex(
      container,
      getProjectIndex(container, task.dataset.project),
      task.dataset.index,
    ),
    task.dataset.project,
    task.dataset.index,
  );
}

function submitEditedTask(e) {
  const btnWrapper = e.target.closest(".form--submit");
  const task = btnWrapper.previousSibling;
  const inputTitle = task.querySelector("input");
  const inputDate = task.querySelector('[type="date"]');
  const inputDesc = task.querySelector("textarea");
  const priority = task.querySelector("select");
  editTask(
    container,
    getProjectIndex(container, task.dataset.project),
    getTaskIndex(
      container,
      getProjectIndex(container, task.dataset.project),
      task.dataset.index,
    ),
    inputTitle.value,
    inputDate.value,
    inputDesc.value,
    priority.value,
  );
  displayTaskToDOM(container, currentProject);
  localStorage.setItem("container", JSON.stringify(container));
}

function cancelEdit() {
  displayTaskToDOM(container, currentProject);
}

function removeTheProject(e) {
  let project = e.target.closest(".project");
  let projectIndex = getProjectIndex(container, project.dataset.index);
  let currProjectID = container[currentProject].ID;
  removeProject(container, projectIndex);
  removeProjectDOM(project.dataset.index);
  if (projectIndex != currentProject) {
    selected(undefined, currProjectID);
    console.log(currentProject);
    return;
  }
  localStorage.setItem("container", JSON.stringify(container));
  selected(undefined, "All Tasks");
}
