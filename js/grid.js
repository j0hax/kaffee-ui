function updateGrid () {
  grid = document.getElementById('user-grid')

  // clear
  grid.innerHTML = ''

  users = get_users()

  for (i = 0; i < users.length; i++) {
    // our grid element
    const gridElement = document.createElement('div')
    gridElement.className = 'pure-u-1-3'

    // our name
    const name = document.createElement('div')
    name.innerHTML = users[i].name
    name.classList.add('user-button')
    name.onclick = function () {
      add_drink(name.innerHTML)
      updateGrid()
    }

    gridElement.appendChild(name)
    grid.appendChild(gridElement)
  }
}

window.onLoad = updateGrid()
