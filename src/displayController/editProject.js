export function removeProjectDOM(projectIndex) {
  const project = document.querySelector(`nav [data-index="${projectIndex}"]`)
  project.remove()
}