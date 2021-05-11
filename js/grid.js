function updateGrid(users) {
  grid = document.getElementById('user-grid')

  // clear
  grid.innerHTML = ''

  console.log("Adding", users.length, "users...")

  for (i = 0; i < users.length; i++) {
    // our column
    const column = document.createElement('div')
    column.className = "col"

    // our card
    const card = document.createElement('div')
    card.className = 'card'
    column.appendChild(card)

    // our body
    const body = document.createElement('div')
    body.className = 'card-body'
    card.appendChild(body)

    // our name
    const title = document.createElement('h5')
    title.innerHTML = users[i].name
    title.className = 'card-title'
    body.appendChild(title)

    // add text
    const balance = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(users[i].balance / 100);
    const text = document.createElement('p')
    text.className = "card-text"
    text.innerHTML = "Saldo: " + balance
    body.appendChild(text)

    // Process clicks
    card.onclick = async function () {
      add_drink(title.innerHTML).then(get_users().then((users) => updateGrid(users)))
    }

    grid.appendChild(column)
  }
}

window.onload = function () {
  console.log("Document loaded, creating user grid...")
  get_users().then((users) => updateGrid(users))

  /*setInterval(function () {
    console.log("[Autorefresh]")
    updateGrid()
  }, 30000)*/
}
