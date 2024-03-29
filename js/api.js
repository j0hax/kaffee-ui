/* API for interacting between Client and Server
 * Primary function is to provide access to the locally stored users array
 * and synchronise this with a server.
 */

let server_online = false

/**
 * Sends data to the configured server and returns the JSON
 * @param {String} resource
 * @param {Object} data
 * @returns JSON
 */
async function postData(resource = '', data = {}) {
  const url = config.server + resource

  const response = await fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': config.apiKey
    },
    redirect: 'follow',
    body: JSON.stringify(data)
  })

  return response.json()
}

// User books a drink
function add_drink(userid) {
  const transactions = JSON.parse(localStorage.getItem('transactions') || '[]')

  const users = get_users()
  const foundUser = users.find(({ id }) => id == userid)

  if (foundUser == null) {
    console.error("No user with ID " + userid + " found!")
    return;
  }

  transactions.push({
    user: foundUser.id,
    amount: -(config.drinkPrice),
    description: 'Buchung vom Kaffeesysem',
    timestamp: Date.now() / 1000
  })

  localStorage.setItem('transactions', JSON.stringify(transactions))
  sync()

  // switch to main tab
  const firstTab = new bootstrap.Tab(document.getElementById('mainTab'))
  firstTab.show()

  showAlert('Kaffee für ' + foundUser.name + ' gebucht.')
}

// sort users by their last modified date
function compare_users(a, b) {
  return b.lastUpdate - a.lastUpdate
}

// get a list of users
function get_users() {
  sync()
  return JSON.parse(localStorage.getItem('users') || '[]')
}

function sync() {
  const transactions = JSON.parse(localStorage.getItem('transactions') || '[]')

  // sync all pending transactions
  postData('transactions', transactions).then(
    function (data) {
      server_online = true

      // Update user data
      localStorage.setItem('users', JSON.stringify(data.users))
      console.log('Synced %i users with %i transactions', data.users.length, transactions.length)
      localStorage.setItem('transactions', '[]')

      // Update dynamic content
      updateGrid(data.users)
      updateTable(data.users)
      updateStatus(data.statistics)
    },
    function (data) {
      console.error('Could not sync: ' + data)
      showAlert('Achtung, server ist nicht erreichbar.')
      server_online = false
    }
  )
}

function showAlert(message) {
  window.scrollTo(0, 0);
  const stat = document.getElementById('mainStatus')
  const collapse = new bootstrap.Collapse(stat, { toggle: false })
  stat.innerHTML = message
  collapse.show()
  setTimeout(function () { collapse.hide() }, 5000)
}
