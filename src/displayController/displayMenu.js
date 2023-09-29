export function displayMenuToDOM(menuContainer) {
  if (document.querySelector('.menu') !== null) {
    const currentMenu = document.querySelector('.menu')
    if (currentMenu.closest('.menu--container') === menuContainer) {
      hideMenu()
      return
    }
    hideMenu()
  }
  const menu = document.createElement('div')
  let className = [{
    clas: 'menu--details',
    text: "Details"
  },{
    clas: 'menu--edit',
    text: "Edit"
  },{
    clas: 'menu--delete',
    text: "Delete"
  }] 
  for (let elem of className) {
    const btn = document.createElement('p')
    btn.classList.add(elem.clas)
    btn.innerText = elem.text
    menu.append(btn)
  }
  menu.classList.add('menu')
  menuContainer.append(menu);
}

export function hideMenu() {
  const menu = document.querySelector('.menu')
  menu.remove()
}
