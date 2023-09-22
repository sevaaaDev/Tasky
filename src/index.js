import { createProject, createTask, getIndex, getProjectIndex, getTaskIndex } from "./taskCreator.js";
import { checklist, editTask, editTodo, removeTask, removeTodo } from "./taskEditor.js";
// import {
//   selectDOM,
//   displayProjectToDOM,
//   highlightSelected,
//   showFormProject,
//   cancelAdd,
//   displayTaskToDOM,
//   checklistTaskDOM,
//   removeTaskDOM,
//   editTaskDOM,
//   hideButtonSubmit,
//   applyEditedTaskDOM,
// } from "./displayController/displayController.js";
import { displayTaskToDOM } from "./displayController/displayTask.js";
import { displayProjectToDOM } from "./displayController/displayProject.js";
import { showFormProject, cancelAdd } from "./displayController/addTaskOrProject.js";
import { checklistTaskDOM, removeTaskDOM, editTaskDOM } from "./displayController/editTask.js";
import { highlightSelected } from "./displayController/displayBehavior.js";
import { filterToday, filter7days } from "./taskFilter.js";

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
addGlobalEventListener("click", "main form .button--check", formTask);
addGlobalEventListener("click", "main form .button--check svg", formTask);
addGlobalEventListener("submit", "main form", formTask);
addGlobalEventListener("click", "main form .button--x", cancelAdd.bind(null, 'task'));
addGlobalEventListener("click", "main form .button--x svg", cancelAdd.bind(null, 'task'));
addGlobalEventListener('click', '.button--status img', checklistTheTask)
addGlobalEventListener('click', ".button--delete img", removeTheTask)
addGlobalEventListener('click', '.button--edit img', editTheTask)
addGlobalEventListener('click', "main .main--task-container .button--check", submitEditedTask)
addGlobalEventListener('click', "main .main--task-container .button--x", cancelEdit)

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
  inputDate.removeAttribute('style')
  if (inputDate.value === '') {
    inputDate.focus()
    inputDate.style.outline = 'solid red'
    return
  }
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
  console.log(container)
  console.log(currentProject);
  cancelAdd('task')
  displayTaskToDOM(container, currentProject);
}

function checklistTheTask(e) {
  const task = e.target.closest('.task')
  checklist(container,getProjectIndex(container, task.dataset.project), getTaskIndex(container, getProjectIndex(container, task.dataset.project), task.dataset.index))
  checklistTaskDOM(task.dataset.project, task.dataset.index)
  console.log(container)
}

function removeTheTask(e) {
  const task = e.target.closest('.task')
  console.log(task)
  removeTask(container,getProjectIndex(container, task.dataset.project), getTaskIndex(container, getProjectIndex(container, task.dataset.project), task.dataset.index))
  removeTaskDOM(task.dataset.project, task.dataset.index)
  console.log(container)
}

// function editTheTask(e) {
//   const task = e.target.closest('.task')
//   console.log(task)
//   editTaskDOM(container, currentProject, task.dataset.project, task.dataset.index, getIndex(container, currentProject,task.dataset.index))
// }

// function submitEditedTask(e) {
//   const btnWrapper = e.target.closest('.form--submit')
//   const task = btnWrapper.previousSibling
//   const inputTitle = task.querySelector('input')
//   const inputDate = task.querySelector('[type="date"]')
//   editTask(container, task.dataset.project, getIndex(container, currentProject,task.dataset.index), inputTitle.value, inputDate.value)
//   displayTaskToDOM(container, currentProject)
// }

// function cancelEdit() {
//   displayTaskToDOM(container, currentProject)
// }