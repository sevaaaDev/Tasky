import { createProject, createTask } from "./todoCreator.js";
import { checklist, editTodo, removeTodo } from "./todoEditor.js";
import {
  selectDOM,
  displayProjectToDOM,
  highlightSelected,
  showFormProject,
  cancelAdd,
  displayTaskToDOM,
} from "./displayController.js";
import { filterToday, filter7days } from "./todoFilter.js";

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
addGlobalEventListener("click", ".button--add-project", showFormProject);
addGlobalEventListener("click", "nav .button--x", cancelAdd.bind(null, 'project'));
addGlobalEventListener("click", "nav .button--x svg", cancelAdd.bind(null, 'project'));
addGlobalEventListener("click", "nav .button--check", formProject);
addGlobalEventListener("click", "nav .button--check svg", formProject);
addGlobalEventListener("submit", "nav form", formProject);
addGlobalEventListener("click", ".button--add-task", showFormProject);
addGlobalEventListener("click", "main .button--check", formTask);
addGlobalEventListener("click", "main .button--check svg", formTask);
addGlobalEventListener("submit", "main form", formTask);
addGlobalEventListener("click", "main .button--x", cancelAdd.bind(null, 'task'));
addGlobalEventListener("click", "main .button--x svg", cancelAdd.bind(null, 'task'));

let container = [];
let currentProject = 1;

function createNewProject(container, name) {
  createProject(container, name);
  displayProjectToDOM(container, container.length - 1);
  const project = document.querySelector(
    `[data-index='${container.length - 1}']`
  );
  console.log(project);
  project.addEventListener("click", selected)
}

function formProject(e) {
  e.preventDefault();
  const input = document.querySelector("nav form input");
  createNewProject(container, input.value);
  cancelAdd('project');
}

function formTask(e) {
  e.preventDefault();
  const inputTitle = document.querySelector("main form input");
  const inputDate = document.querySelector('main form input[type="date"]');
  console.log(inputDate, inputTitle)
  createTask(container, currentProject, inputTitle.value, inputDate.value);
  displayTaskToDOM(container, currentProject)
  cancelAdd('task');
}

createNewProject(container, "ReactJS");

function selected(e) {
  if (currentProject === e.target.dataset.index) return;
  currentProject = e.target.dataset.index;
  highlightSelected(e);
  console.log(currentProject);
  cancelAdd('task')
  displayTaskToDOM(container, currentProject);
}
