import lightFormat from "date-fns/lightFormat"
import { displayTaskToDOM } from "./displayTask"
import { disableAddTask } from "./displayBehavior"
export function editTaskDOM(container, currentProject, projectIndex, taskIndex, projectID, taskID) {
  let lvl = ['Low', "Medium", 'High']
  displayTaskToDOM(container,currentProject)
  const task = document.querySelector(`[data-project="${projectID}"][data-index="${taskID}"]`)
  const ellipsis = task.querySelector('.menu--container')
  const btnStatus = task.querySelector('.button--status')
  const title = task.querySelector('.task--title')
  const date = task.querySelector('.task--date')
  const inputWrapper = document.createElement('div')
  const inputTitle = document.createElement('input')
  const inputDate = document.createElement('input')
  const inputDesc = document.createElement('textarea')
  const priority = document.createElement('select')
  for (let level of lvl) {
    const option = document.createElement('option')
    option.setAttribute('value', level)
    option.innerText = level
    if (container[projectIndex].task[taskIndex].priority === level) {
      option.setAttribute('selected', true)
    }
    priority.append(option)
  }
  inputWrapper.classList.add('task--info-wrapper')
  inputTitle.value = title.innerText
  inputDate.setAttribute('type', 'date')
  inputDesc.value = container[projectIndex].task[taskIndex].desc
  if (container[projectIndex].task[taskIndex].dueDate !== '') {
    inputDate.value = lightFormat(new Date(container[projectIndex].task[taskIndex].dueDate), 'yyyy-MM-dd')
  }
  title.remove()
  inputWrapper.append(inputTitle, inputDesc, inputDate, priority)
  task.insertBefore(inputWrapper, date.parentElement)
  date.parentElement.remove()
  inputTitle.focus()
  ellipsis.remove()
  btnStatus.remove()
  task.classList.add('task-flex')
  task.classList.remove('task')
  disableAddTask()
  showButtonSubmit(task)
}

function showButtonSubmit(task) {
  const container = document.querySelector('.main--task-container')
  const wrapper = document.createElement('div')
  const btnAccept = document.createElement('button')
  const btnCancel = document.createElement('button')
  const checkIcon = document.createElement('img')
  const cancelIcon = document.createElement('img')
  wrapper.classList.add('form--submit')
  btnAccept.setAttribute('type', 'button')
  btnCancel.setAttribute('type', 'button')
  btnAccept.classList.add('button--check')
  btnCancel.classList.add('button--x')
  checkIcon.setAttribute('src', 'icons/check.svg')
  cancelIcon.setAttribute('src', 'icons/x.svg')
  btnAccept.append(checkIcon)
  btnCancel.append(cancelIcon)
  wrapper.append(btnAccept, btnCancel)
  container.insertBefore(wrapper, task.nextSibling)
}

export function hideButtonSubmit() {
  const btn = document.querySelector('.main--task-container .form--submit')
  if (btn !== null) {
    btn.remove()
  }
}

export function checklistTaskDOM(projectIndex, taskIndex) {
  const task = document.querySelector(`[data-project="${projectIndex}"][data-index="${taskIndex}"]`)
  const img = task.querySelector('.button--status img')
  const title = task.querySelector('.task--title')
  const date = task.querySelector('.task--date')
  console.log(img.getAttribute('src'))
  if (img.getAttribute('src') === 'icons/check-circle.svg') {
    img.setAttribute('src', 'icons/circle.svg')
  } else {
    img.setAttribute('src', 'icons/check-circle.svg')
  }
  if (title === null) return
  title.classList.toggle('checked')
  date.classList.toggle('checked')
}

export function removeTaskDOM(projectIndex, taskIndex) {
  const task = document.querySelector(`[data-project="${projectIndex}"][data-index="${taskIndex}"]`)
  task.remove()
}
