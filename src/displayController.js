export function displayTodoToDOM(container, projectIndex) {
  resetTodoDisplay();
  const todoContainer = document.querySelector(".todo-container");
  todoContainer.classList.add("todo-container");
  for (let todo of container[projectIndex].todo) {
    const list = document.createElement("ul");
    for (let prop in todo) {
      const li = document.createElement("li");
      list.setAttribute("data-id", container[projectIndex].todo.indexOf(todo));
      li.innerText = `${prop} : ${todo[prop]}`;
      list.append(li);
    }
    todoContainer.append(list);
  }
}

function resetTodoDisplay() {
  const todoContainer = document.querySelector(".todo-container");
  todoContainer.innerHTML = "";
}

function resetProjectDisplay() {
  const projectContainer = document.querySelector(".project-container");
  projectContainer.innerHTML = "";
}

export function selectDOM(selector) {
  return document.querySelector(selector);
}

export function displayProjectToDOM(container, projectIndex) {
  const projectContainer = document.querySelector(".project-container");
  const div = document.createElement("div");
  div.innerText = container[projectIndex]["name"];
  div.setAttribute("data-id", projectIndex);
  div.classList.add("project");
  projectContainer.append(div);
}
