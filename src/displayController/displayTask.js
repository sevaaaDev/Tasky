import { format } from "date-fns";
import { resetTaskDisplay } from "./displayReset";
import { disableAddTask, enableAddTask } from "./displayBehavior";

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
    const infoWrapper = document.createElement('div')
    infoWrapper.classList.add('task--info-wrapper')
    const title = document.createElement('p')
    title.innerText = task.name
    title.classList.add('task--title')
    const dueDate = document.createElement('p')
    dueDate.innerText = `Due ${format(task.dueDate, 'd MMM yyyy')}`
    dueDate.classList.add('task--date')
    taskElement.setAttribute("data-index", task["ID"]);
    taskElement.setAttribute("data-project", task["project"]);
    console.log(task.dueDate)
    taskContainer.append(taskElement);
    const btnEdit = document.querySelector(`main div[data-project="${task.project}"][data-index="${task.ID}"] .button--edit`)
    const btnStatusIcon = document.querySelector(`main div[data-project="${task.project}"][data-index="${task.ID}"] .button--status img`)
    if (task.checklist === true) {
      title.classList.add('checked')
      dueDate.classList.add('checked')
      btnStatusIcon.setAttribute('src', 'icons/check-circle.svg')
    }
    infoWrapper.append(title, dueDate)
    taskElement.insertBefore(infoWrapper, btnEdit) 
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
    const infoWrapper = document.createElement('div')
    infoWrapper.classList.add('task--info-wrapper')
    const title = document.createElement('p')
    title.innerText = task.name
    title.classList.add('task--title')
    const dueDate = document.createElement('p')
    dueDate.innerText = `Due ${format(task.dueDate, 'd MMM yyyy')}`
    dueDate.classList.add('task--date')
    taskElement.setAttribute("data-index", task["ID"]);
    taskElement.setAttribute("data-project", task["project"]);
    taskContainer.append(taskElement);
    const btnEdit = document.querySelector(`main div[data-project="${task.project}"][data-index="${task.ID}"] .button--edit`)
    const btnStatusIcon = document.querySelector(`main div[data-project="${task.project}"][data-index="${task.ID}"] .button--status img`)
    if (task.checklist === true) {
      title.classList.add('checked')
      dueDate.classList.add('checked')
      btnStatusIcon.setAttribute('src', 'icons/check-circle.svg')
    }
    infoWrapper.append(title, dueDate)
    taskElement.insertBefore(infoWrapper, btnEdit) 
    }
  }
}