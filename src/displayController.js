export function displayTodoToDOM(container, projectID) {
  resetDisplay()
  const content = document.querySelector('.content')
  for (let todo in container.project[projectID].todo) {
    const list = document.createElement('ul')
    for (let prop in container.project[projectID].todo[todo]) {
      const li = document.createElement('li')
      li.innerText = `${prop} : ${container.project[projectID].todo[todo][prop]}`
      list.append(li)
    }
    content.append(list)
  }
}

function resetDisplay() {
  const content = document.querySelector('.content')
  content.innerHTML = ''
}