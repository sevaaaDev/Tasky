import { createProject, createTodo } from "./todoCreator.js";
import { checklist, editTodo, removeTodo } from "./todoEditor.js";
import {
  displayTodoToDOM,
  selectDOM,
  displayProjectToDOM,
  highlightSelected,
  showFormProject,
  cancelAddProject,
} from "./displayController.js";
import { filterToday, filter7days } from "./todoFilter.js";

function addGlobalEventListener(type, selector, callback) {
  document.addEventListener(type, (e) => {
    if (e.target.matches(selector)) {
      callback(e);
    }
  });
}
addGlobalEventListener("click", ".button--all-tasks", highlightSelected);
addGlobalEventListener("click", ".button--today-tasks", highlightSelected);
addGlobalEventListener("click", ".button--thisweek-tasks", highlightSelected);
addGlobalEventListener("click", ".button--add-project", showFormProject);
addGlobalEventListener("click", "nav .button--x", cancelAddProject);
addGlobalEventListener("click", "nav .button--x svg", cancelAddProject);
addGlobalEventListener("click", "nav .button--check", formProject);
addGlobalEventListener("click", "nav .button--check svg", formProject);
addGlobalEventListener("submit", "nav form", formProject);

let container = [];
let currentProject = 1;
function createNewProject(container, name) {
  createProject(container, name);
  displayProjectToDOM(container, container.length - 1);
  const project = document.querySelector(
    `[data-index='${container.length - 1}']`
  );
  console.log(project);
  project.addEventListener("click", (e) => {
    if (currentProject === +project.dataset.index) return;
    currentProject = +project.dataset.index;
    highlightSelected(e);
    console.log(currentProject);
  });
}

function formProject(e) {
  e.preventDefault();
  const input = document.querySelector("nav form input");
  createNewProject(container, input.value);
  cancelAddProject();
}

createNewProject(container, "ReactJS");
