import { addDays, isToday, isWithinInterval, startOfToday } from "date-fns";

export function filterToday(container) {
  let filtered = [];
  for (let project of container) {
    let tempArray = project.task.filter(compareTodayDate);
    filtered.push(tempArray);
  }
  console.log(filtered);
  return filtered
}

function compareTodayDate(task) {
  if (isToday(task.dueDate)) {
    return true
  }
  return false
}

export function filter7days(container) {
  let filtered = [];
  for (let project of container) {
    let tempArray = project.task.filter(compare7DayDate);
    filtered.push(tempArray);
  }
  console.log(filtered);
  return filtered
}

function compare7DayDate(task) {
  let interval = {
    start: addDays(startOfToday(), 1),
    end: addDays(startOfToday(), 7)
  }
  if (isWithinInterval(task.dueDate, interval)) {
    return true
  }
  return false
}
