function updateGrid () {
  grid = document.getElementById('user-grid')
  
  // clear
  grid.innerHTML = ''

  users = get_users()

  console.log("Adding", users.length, "users...")
  
  for (i = 0; i < users.length; i++) {
    // our grid element
    const gridElement = document.createElement('div')
    gridElement.className = 'pure-u-1-3'

    // our name
    const name = document.createElement('div')
    name.innerHTML = users[i].name
    name.classList.add('user-button')
    name.onclick = function () {
      this.animate([
        { filter: 'brightness(50%)' },
        { filter: 'brightness(100%)' }
      ], {
        duration: 500
      });
      add_drink(name.innerHTML)
    }

    gridElement.appendChild(name)
    grid.appendChild(gridElement)
  }
}

window.onload = function() {
    console.log("Document loaded, creating user grid...")
    updateGrid()
    
    setInterval(function(){
        console.log("[Autorefresh]")
        updateGrid()
    }, 30000)
}
