
/**
 * Updates the Grid with a an array of users
 * @param {Array} users
 */
async function updateGrid (users) {
  grid = document.getElementById('user-grid')

  // clear
  grid.innerHTML = ''

  console.log('Adding', users.length, 'users...')

  for (i = 0; i < users.length; i++) {
    // our column
    const column = document.createElement('div')
    column.className = 'col'

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
    const balance = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(users[i].balance / 100)
    const text = document.createElement('p')
    text.className = 'card-text'
    text.innerHTML = balance

    if (users[i].balance < -1000) {
      text.classList.add('debt')
    }

    body.appendChild(text)

    // Process clicks
    card.onclick = function () {
      add_drink(title.innerHTML)
    }

    grid.appendChild(column)
  }
}
