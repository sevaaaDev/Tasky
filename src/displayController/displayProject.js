import { resetProjectDisplay } from "./displayReset";

export function displayProjectToDOM(container, projectIndex) {
  resetProjectDisplay()
  const projectContainer = document.querySelector(".nav--project-container");
  for (let project of container) {
    const div = document.createElement("div");
    const icon = document.createElement("img");
    const btnDelete = document.createElement('img')
    btnDelete.setAttribute('src', 'icons/x.svg')
    btnDelete.classList.add('btn--delete-project')
    icon.setAttribute("src", "icons/folder.svg");
    div.append(icon, project["name"], btnDelete);
    div.setAttribute("data-index", project["ID"]);
    div.classList.add("project");
    projectContainer.append(div);
  }
}
