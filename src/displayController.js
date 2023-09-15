export function displayTodoToDOM(container, projectID) {
  resetDisplay()
  const projectDOM = document.querySelector('.content')
  for (let todo in container[projectID]) {
    const list = document.createElement('ul')
    for (let prop in container[projectID][todo]) {
      const li = document.createElement('li')
      li.innerText = `${prop} : ${container[projectID][todo][prop]}`
      list.append(li)
    }
    projectDOM.append(list)
  }
}

function resetDisplay() {
  const content = document.querySelector('.content')
  content.innerHTML = ''
}

export function selectDOM(selector) {
  return document.querySelector(selector)
}