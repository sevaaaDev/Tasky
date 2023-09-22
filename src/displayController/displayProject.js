import { resetProjectDisplay } from "./displayReset";

export function displayProjectToDOM(container, projectIndex) {
  resetProjectDisplay()
  const projectContainer = document.querySelector(".nav--project-container");
  for (let project of container) {
    const div = document.createElement("div");
    const icon = document.createElement("img");
    icon.setAttribute("src", "icons/folder.svg");
    div.append(icon, project["name"]);
    div.setAttribute("data-index", project["ID"]);
    div.classList.add("project");
    projectContainer.append(div);
  }
}
