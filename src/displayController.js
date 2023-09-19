export function displayTodoToDOM(container, projectIndex) {
  resetTodoDisplay();
  const taskContainer = document.querySelector(".main--task-container");
  for (let todo of container[projectIndex].todo) {
    for (let prop in todo) {
      const todoElement = document.createElement("div");
      todoElement.setAttribute("data-id", todo["oriIndex"]);
      todoElement.innerText = `${todo["name"]}`;
      taskContainer.append(todoElement);
    }
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
  console.log(btnProject);
  e.target.classList.add("selected");
}

function resetHighlighting(nodelist) {
  for (let elem of nodelist) {
    elem.classList.remove("selected");
  }
}

export function showFormProject(e) {
  const form = document.querySelector('[class*="form--add-project"]');
  const btnAdd = document.querySelector('[class*="button--add-project"]');
  const input = form.querySelector("input");
  form.classList.add("form--add-project");
  btnAdd.classList.add("button--add-project__invisible");
  btnAdd.classList.remove("button--add-project");
  input.focus();
}

export function cancelAddProject() {
  const form = document.querySelector('[class*="form--add-project"]');
  const btnAdd = document.querySelector('[class*="button--add-project"]');
  const input = form.querySelector("input");
  input.value = "";
  form.classList.toggle("form--add-project");
  btnAdd.classList.toggle("button--add-project");
}
