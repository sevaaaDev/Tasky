import Container from "./todoCreator.js";
import { createProject, createTodo } from "./todoCreator.js";
import { checklist, editTodo, removeTodo } from "./todoEditor.js";
import { displayTodoToDOM, selectDOM, displayProjectToDOM } from "./displayController.js";

let container = []
let currentProject
function createNewProject(name) {
  let projectID = createProject(container, name)
  displayProjectToDOM(container, container.length - 1)
  let project = selectDOM(`[data-id='${container.length - 1 }'`)
  project.addEventListener('click', () => {
    if (currentProject === project.dataset.id) {
      return
    }
    currentProject = project.dataset.id
    displayTodoToDOM(container, currentProject)
    console.log(currentProject)
  })
}
createNewProject('js', 0)
createNewProject('html', 1)
createNewProject('css', 2)

let projectDOM = document.getElementsByClassName('project')
console.log(projectDOM)

let key = Object.keys(container)
console.log(container)

const input = {
  name: document.querySelector('#name'),
  desc: document.querySelector('#desc'),
  date: document.querySelector('#date'),
  priority: document.querySelector('#priority'),
}

const form = document.querySelector('form')
form.addEventListener('submit' ,(e) => {
  e.preventDefault()
  createTodo(container, currentProject, input.name.value, input.desc.value, input.date.value, input.priority.value)
  displayTodoToDOM(container, currentProject)
})