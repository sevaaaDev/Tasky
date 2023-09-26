import { createProject, createTask, getProjectIndex, getTaskIndex } from "./taskCreator.js";
import { checklist, editTask, removeTask } from "./taskEditor.js";
import { displayTaskToDOM } from "./displayController/displayTask.js";
import { displayProjectToDOM } from "./displayController/displayProject.js";
import { showFormProject, cancelAdd } from "./displayController/addTaskOrProject.js";
import { checklistTaskDOM, removeTaskDOM, editTaskDOM } from "./displayController/editTask.js";
import { changeCategoryHeading, highlightSelected, toggleNavBar } from "./displayController/displayBehavior.js";
import { removeProject } from "./projectEditor.js";
import { removeProjectDOM } from "./displayController/editProject.js";

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
addGlobalEventListener('click', 'nav .project', selected)
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
addGlobalEventListener('click', '.btn--delete-project', removeTheProject)
addGlobalEventListener('click', '.hamburger', toggleNavBar)

let container = [];
let currentProject = 0;

if (window.screen.width > 768) {
  toggleNavBar()
}

if (!localStorage.getItem('container')) {
  createNewProject(container, "Study");
} else {
  container = JSON.parse(localStorage.getItem('container'))
  displayProjectToDOM(container)
}
selected(undefined, 'All Tasks')

function createNewProject(container, name) {
  createProject(container, name);
  localStorage.setItem('container',JSON.stringify(container))
  displayProjectToDOM(container);
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
  createTask(container, currentProject, inputTitle.value, inputDate.value);
  localStorage.setItem('container',JSON.stringify(container))
  displayTaskToDOM(container, currentProject)
  cancelAdd('task');
}


function selected(e, custom) {
  let projectIndex = getProjectIndex(container,custom)
  if (e !== undefined) {
    projectIndex = getProjectIndex(container, e.target.dataset.index)
  }
  if (currentProject === projectIndex) return;
  currentProject = projectIndex;
  highlightSelected(e, custom);
  cancelAdd('task')
  changeCategoryHeading(container, currentProject)
  displayTaskToDOM(container, currentProject);
}

function checklistTheTask(e) {
  const task = e.target.closest('.task')
  checklist(container,getProjectIndex(container, task.dataset.project), getTaskIndex(container, getProjectIndex(container, task.dataset.project), task.dataset.index))
  checklistTaskDOM(task.dataset.project, task.dataset.index)
  localStorage.setItem('container',JSON.stringify(container))
}

function removeTheTask(e) {
  const task = e.target.closest('.task')
  removeTask(container,getProjectIndex(container, task.dataset.project), getTaskIndex(container, getProjectIndex(container, task.dataset.project), task.dataset.index))
  removeTaskDOM(task.dataset.project, task.dataset.index)
  localStorage.setItem('container',JSON.stringify(container))
}

function editTheTask(e) {
  const task = e.target.closest('.task')
  editTaskDOM(container, currentProject, getProjectIndex(container, task.dataset.project), getTaskIndex(container, getProjectIndex(container, task.dataset.project), task.dataset.index), task.dataset.project, task.dataset.index)
}

function submitEditedTask(e) {
  const btnWrapper = e.target.closest('.form--submit')
  const task = btnWrapper.previousSibling
  const inputTitle = task.querySelector('input')
  const inputDate = task.querySelector('[type="date"]')
  editTask(container, getProjectIndex(container, task.dataset.project) , getTaskIndex(container, getProjectIndex(container, task.dataset.project) ,task.dataset.index), inputTitle.value, inputDate.value)
  displayTaskToDOM(container, currentProject)
  localStorage.setItem('container',JSON.stringify(container))
}

function cancelEdit() {
  displayTaskToDOM(container, currentProject)
}

function removeTheProject(e) {
  let project = e.target.closest('.project')
  let projectIndex = getProjectIndex(container, project.dataset.index)
  removeProject(container, projectIndex)
  removeProjectDOM(project.dataset.index)
  if (projectIndex != currentProject) {
    displayTaskToDOM(container, currentProject)
    return
  }
  localStorage.setItem('container',JSON.stringify(container))
  selected(undefined, 'All Tasks')
}
