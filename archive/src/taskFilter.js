import { addDays, isToday, isWithinInterval, startOfToday } from "date-fns";

export function filterToday(container) {
  let filtered = [];
  for (let project of container) {
    let tempArray = project.task.filter(compareTodayDate);
    filtered.push(tempArray);
  }
  return filtered.flat()
}

function compareTodayDate(task) {
  if (isToday(new Date(task.dueDate))) {
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
  return filtered.flat()
}

function compare7DayDate(task) {
  let interval = {
    start: addDays(startOfToday(), 1),
    end: addDays(startOfToday(), 7)
  }
  if (isWithinInterval(new Date(task.dueDate), interval)) {
    return true
  }
  return false
}

export function getAllTask(container) {
  let filtered = []
  for (let project of container) {
    filtered.push(project.task)
  }
  return filtered.flat()
}
