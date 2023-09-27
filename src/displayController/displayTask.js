import { format } from "date-fns";
import { resetTaskDisplay } from "./displayReset";
import { disableAddTask, enableAddTask } from "./displayBehavior";
import { filterToday, filter7days, getAllTask } from "../taskFilter";

export function displayTaskToDOM(container, projectIndex) {
  if (typeof projectIndex === 'number') {
    enableAddTask()
    displayTask(container[projectIndex].task)
    return
  }
  if (projectIndex === 'All Tasks') {
    let all = getAllTask(container)
    disableAddTask()
    displayTask(all)
    return
  }
  if (projectIndex ===  'Today Tasks') {
    let today = filterToday(container)
    disableAddTask()
    displayTask(today)
    return
  }
  if (projectIndex === "This Week Tasks") {
    let week = filter7days(container)
    disableAddTask()
    displayTask(week)
    return
  }
}

function displayTask(container) {
  const buttons = [{
    type: 'status',
    icon: 'circle.svg'
  },
  {
    type: 'ellipsis',
    icon: 'more-vertical.svg'
  }]
  const priority = {
    Low: 'green',
    Medium: "yellow",
    High: "red",
  }
  resetTaskDisplay();
  const taskContainer = document.querySelector(".main--task-container");
  for (let task of container) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.style.borderLeft = `5px solid ${priority[task.priority]}`
    const btn = document.createElement('button') 
    btn.setAttribute('type', 'button')
    btn.classList.add(`button--${buttons[0].type}`)
    const img = document.createElement('img')
    img.setAttribute('src', `icons/${buttons[0].icon}`)
    btn.append(img)
    taskElement.append(btn)
    const menuContainer = document.createElement('div')
    const btnEllipsis = document.createElement('button') 
    btnEllipsis.setAttribute('type', 'button')
    btnEllipsis.classList.add(`button--${buttons[1].type}`)
    const imgMenu = document.createElement('img')
    imgMenu.setAttribute('src', `icons/${buttons[1].icon}`)
    btnEllipsis.append(imgMenu)
    menuContainer.append(btnEllipsis) 
    menuContainer.classList.add('menu--container')
    taskElement.append(menuContainer)
    const infoWrapper = document.createElement('div')
    infoWrapper.classList.add('task--info-wrapper')
    const title = document.createElement('p')
    title.innerText = task.name
    title.classList.add('task--title')
    const dueDate = document.createElement('p')
    dueDate.innerText = "No due date" 
    if (task.dueDate !== '') {
      dueDate.innerText = `${format(new Date(task.dueDate), 'd MMM yyyy')}`
    }
    dueDate.classList.add('task--date')
    taskElement.setAttribute("data-index", task["ID"]);
    taskElement.setAttribute("data-project", task["project"]);
    taskContainer.append(taskElement);
    const btnStatusIcon = document.querySelector(`main div[data-project="${task.project}"][data-index="${task.ID}"] .button--status img`)
    if (task.checklist === true) {
      title.classList.add('checked')
      dueDate.classList.add('checked')
      btnStatusIcon.setAttribute('src', 'icons/check-circle.svg')
    }
    infoWrapper.append(title, dueDate)
    taskElement.insertBefore(infoWrapper, menuContainer) 
  }
}
