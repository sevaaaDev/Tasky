export function filterToday(container) {
  let filtered = [];
  for (let project of container) {
    let tempArray = project.task.filter(compareTodayDate);
    filtered.push(tempArray);
  }
  console.log(filtered);
}

function compareTodayDate(task) {
  const date = new Date().getDate();
  return task.dueDate === date;
}

export function filter7days(container) {
  let filtered = [];
  for (let project of container) {
    let tempArray = project.task.filter(compare7DayDate);
    filtered.push(tempArray);
  }
  console.log(filtered);
}

function compare7DayDate(task) {
  const date = new Date().getDate();
  return task.dueDate < date + 7 && todo.dueDate > date;
}
