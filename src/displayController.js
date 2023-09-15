export function displayTodoToDOM(container, projectID) {
  resetTodoDisplay()
  const todoContainer = document.querySelector('.todo-container')
  todoContainer.classList.add('todo-container')
  for (let todo in container[projectID].todo) {
    const list = document.createElement('ul')
    for (let prop in container[projectID].todo[todo]) {
      const li = document.createElement('li')
      li.innerText = `${prop} : ${container[projectID].todo[todo][prop]}`
      list.append(li)
    }
    todoContainer.append(list)
  }
}

function resetTodoDisplay() {
  const todoContainer = document.querySelector('.todo-container')
  todoContainer.innerHTML = ''
}
function resetProjectDisplay() {
  const projectContainer = document.querySelector('.project-container')
  projectContainer.innerHTML = ''
}
export function selectDOM(selector) {
  return document.querySelector(selector)
}

export function displayProjectToDOM(container) {
  resetProjectDisplay()
  const projectContainer = document.querySelector('.project-container')
  projectContainer.classList.add('project-container')
  console.log(projectContainer)
  for (let prop in container) {
    const div = document.createElement('div')
    div.innerText = container[prop]['name']
    console.log(div)
    projectContainer.append(div)
  }
}