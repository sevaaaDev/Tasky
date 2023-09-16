import { createProject, createTodo } from "./todoCreator.js";
import { checklist, editTodo, removeTodo } from "./todoEditor.js";
import {
  displayTodoToDOM,
  selectDOM,
  displayProjectToDOM,
} from "./displayController.js";

function startScript() {
  let container = [];
  let currentProject = 0;
  checkLocalStorage();
  function checkLocalStorage() {
    if (localStorage.length !== 0) {
      container = JSON.parse(localStorage.getItem("container"));
      console.log(container)
      displayProjectToDOM(container, container.length - 1);
      displayTodoToDOM(container, currentProject);
      return;
    }
    createNewProject("js");
  }

  function createNewProject(name) {
    createProject(container, name);
    displayProjectToDOM(container, container.length - 1);
    localStorage.setItem("container", JSON.stringify(container));
    let project = selectDOM(`[data-id='${container.length - 1}'`);
    project.addEventListener("click", () => {
      if (currentProject === +project.dataset.id) return;
      currentProject = +project.dataset.id;
      displayTodoToDOM(container, currentProject);
      console.log(currentProject);
    });
  }

  const input = {
    name: document.querySelector("#name"),
    desc: document.querySelector("#desc"),
    date: document.querySelector("#date"),
    priority: document.querySelector("#priority"),
  };

  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    createTodo(
      container,
      currentProject,
      input.name.value,
      input.desc.value,
      input.date.value,
      input.priority.value
    );
    displayTodoToDOM(container, currentProject);
    localStorage.setItem("container", JSON.stringify(container));
  });
}
startScript();
