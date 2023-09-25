export function disableAddTask() {
  const btnAddTask = document.querySelector('[class*="button--add-task"]');
  btnAddTask.classList.remove('button--add-task')
}

export function enableAddTask() {
  const btnAddTask = document.querySelector('[class*="button--add-task"]');
  btnAddTask.classList.add('button--add-task')
}

export function highlightSelected(e, all) {
  const btnFilter = document.querySelectorAll('nav [class*="button"]');
  const btnProject = document.querySelectorAll(
    'nav .nav--project-container [class*="project"]'
  );
  resetHighlighting(btnProject);
  resetHighlighting(btnFilter);
  if (all !== undefined) {
    for (let btn of btnFilter) {
      if (btn.dataset.index === 'All Tasks') {
        btn.classList.add('selected')
        return
      }
    }
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
  const heading = document.querySelector('main h2') 
  console.log(typeof projectIndex)
  if (typeof projectIndex !== 'number') {
    heading.innerText = projectIndex
    return
  }
  heading.innerText = container[projectIndex].name
  console.log(container[projectIndex].name)
}
