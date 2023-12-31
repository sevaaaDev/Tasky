export function disableAddTask() {
  const btnAddTask = document.querySelector('[class*="button--add-task"]');
  btnAddTask.classList.remove("button--add-task");
}

export function enableAddTask() {
  const btnAddTask = document.querySelector('[class*="button--add-task"]');
  btnAddTask.classList.add("button--add-task");
}

export function highlightSelected(e, custom) {
  const btnFilter = document.querySelectorAll('nav [class*="button"]');
  const btnProject = document.querySelectorAll(
    'nav .nav--project-container [class*="project"]',
  );
  resetHighlighting(btnProject);
  resetHighlighting(btnFilter);
  if (custom !== undefined) {
    for (let btn of btnFilter) {
      if (btn.dataset.index === custom) {
        btn.classList.add("selected");
        return;
      }
    }
    for (let project of btnProject) {
      if (project.dataset.index == custom) {
        project.classList.add("selected");
        return;
      }
    }
    return;
  }
  if (e.target.className !== "project") {
    for (let btn of btnFilter) {
      if (e.target.className === btn.className) {
        btn.classList.add("selected");
      }
    }
    return;
  }
  e.target.classList.add("selected");
}

function resetHighlighting(nodelist) {
  for (let elem of nodelist) {
    elem.classList.remove("selected");
  }
}

export function changeCategoryHeading(container, projectIndex) {
  const heading = document.querySelector("main h2");
  if (typeof projectIndex !== "number") {
    heading.innerText = projectIndex;
    return;
  }
  heading.innerText = container[projectIndex].name;
}

export function toggleNavBar() {
  const nav = document.querySelector("nav");
  if (!nav.classList.contains("__invisible")) {
    nav.classList.add("__invisible");
  } else {
    nav.removeAttribute("class");
  }
}
