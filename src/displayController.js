import { format } from "date-fns";

export function displayTaskToDOM(container, projectIndex) {
  const buttons = [{
    type: 'status',
    icon: 'circle.svg'
  },{
    type: 'edit',
    icon: 'edit.svg'
  },{
    type: 'delete',
    icon: 'x.svg'
  },]
  if (projectIndex === 'all') {
    displayAllTask(container, buttons)
    disableAddTask()
    return
  }
  resetTaskDisplay();
  enableAddTask()
  const taskContainer = document.querySelector(".main--task-container");
  for (let task of container[projectIndex].task) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    for (let button of buttons) {
      const btn = document.createElement('button') 
      btn.setAttribute('type', 'button')
      btn.classList.add(`button--${button.type}`)
      const img = document.createElement('img')
      img.setAttribute('src', `icons/${button.icon}`)
      btn.append(img)
      taskElement.append(btn)
    }
    const title = document.createElement('p')
    title.innerText = task.name
    title.classList.add('task--title')
    const dueDate = document.createElement('p')
    dueDate.innerText = ` Due ${format(task.dueDate, 'd')} ${format(task.dueDate, 'MMM')} ${format(task.dueDate, 'y')}`
    dueDate.classList.add('task--date')
    taskElement.setAttribute("data-index", task["oriIndex"]);
    taskElement.setAttribute("data-project", task["project"]);
    console.log(task.dueDate)
    taskContainer.append(taskElement);
    const btnEdit = document.querySelector(`main div[data-project="${task.project}"][data-index="${task.oriIndex}"] .button--edit`)
    const btnStatusIcon = document.querySelector(`main div[data-project="${task.project}"][data-index="${task.oriIndex}"] .button--status img`)
    if (task.checklist === true) {
      title.classList.add('checked')
      dueDate.classList.add('checked')
      btnStatusIcon.setAttribute('src', 'icons/check-circle.svg')
    }
    taskElement.insertBefore(title, btnEdit) 
    taskElement.insertBefore(dueDate, btnEdit) 
  }
}

function displayAllTask(container, buttons) {
  resetTaskDisplay()
  const taskContainer = document.querySelector('.main--task-container')
  for(let project of container) {
    for(let task of project.task) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    for (let button of buttons) {
      const btn = document.createElement('button') 
      btn.setAttribute('type', 'button')
      btn.classList.add(`button--${button.type}`)
      const img = document.createElement('img')
      img.setAttribute('src', `icons/${button.icon}`)
      btn.append(img)
      taskElement.append(btn)
    }
    const title = document.createElement('p')
    title.innerText = task.name
    title.classList.add('task--title')
    const dueDate = document.createElement('p')
    dueDate.innerText = ` Due ${format(task.dueDate, 'd')} ${format(task.dueDate, 'MMM')} ${format(task.dueDate, 'y')}`
    dueDate.classList.add('task--date')
    taskElement.setAttribute("data-index", task["oriIndex"]);
    taskElement.setAttribute("data-project", task["project"]);
    taskContainer.append(taskElement);
    const btnEdit = document.querySelector(`main div[data-project="${task.project}"][data-index="${task.oriIndex}"] .button--edit`)
    const btnStatusIcon = document.querySelector(`main div[data-project="${task.project}"][data-index="${task.oriIndex}"] .button--status img`)
    if (task.checklist === true) {
      title.classList.add('checked')
      dueDate.classList.add('checked')
      btnStatusIcon.setAttribute('src', 'icons/check-circle.svg')
    }
    taskElement.insertBefore(title, btnEdit) 
    taskElement.insertBefore(dueDate, btnEdit) 
    }
  }
}

function disableAddTask() {
  const btnAddTask = document.querySelector('[class*="button--add-task"]');
  btnAddTask.classList.remove('button--add-task')
}

function enableAddTask() {
  const btnAddTask = document.querySelector('[class*="button--add-task"]');
  btnAddTask.classList.add('button--add-task')
}

function resetTaskDisplay() {
  const taskContainer = document.querySelector(".main--task-container");
  taskContainer.innerHTML = "";
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
  const input = form.querySelector("input[type='text']");
  const date = form.querySelector("input[type='date']");
  input.value = "";
  if (date !== null) {date.value = ''}
  form.classList.remove(`form--add-${type}`);
  btnAdd.classList.add(`button--add-${type}`);
}

export function checklistTaskDOM(projectIndex, taskIndex) {
  const task = document.querySelector(`[data-project="${projectIndex}"][data-index="${taskIndex}"]`)
  const img = task.querySelector('.button--status img')
  const title = task.querySelector('.task--title')
  const date = task.querySelector('.task--date')
  console.log(title.className)
  img.setAttribute('src', 'icons/check-circle.svg')
  if (title.classList.contains('checked')) {
    img.setAttribute('src', 'icons/circle.svg')
  }
  title.classList.toggle('checked')
  date.classList.toggle('checked')
}

export function removeTaskDOM(projectIndex, taskIndex) {
  const task = document.querySelector(`[data-project="${projectIndex}"][data-index="${taskIndex}"]`)
  task.remove()
}