/* API for interacting between Client and Server
 * Primary function is to provide access to the locally stored users array
 * and synchronise this with a server.
 */

// POSTs data and returns the server response JSON
async function postData(resource = '', data = {}) {

  url = config.server + resource

  const response = await fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': config.apiKey
    },
    redirect: 'follow',
    body: JSON.stringify(data)
  });

  return response.json();
}

// User books a drink
function add_drink (username) {
  const users = get_users()
  const foundUser = users.find(({ name }) => name === username)

  add_transaction(foundUser.id)
  showStatus('Kaffee für ' + username + ' gebucht.')
}

// sort users by their last modified date
function compare_users (a, b) {
  return b.lastUpdate - a.lastUpdate
}

// get a list of users
function get_users () {
    sync();
    return JSON.parse(localStorage.getItem('users') || '[]')
}

// add to a list of transactions
function add_transaction (user) {
  //sync();
  transactions =  JSON.parse(localStorage.getItem('transactions') || '[]')

  transactions.push({
    'user': user,
    'amount': -(config.drinkPrice),
    'description': 'Buchung vom Kaffeesysem',
    'timestamp': Date.now() / 100
  })

  // save the transactions again
  localStorage.setItem('transactions', JSON.stringify(transactions))
  sync()
}

function sync () {

  transactions = JSON.parse(localStorage.getItem('transactions') || '[]')

  // sync all pending transactions
  postData('/transactions', transactions).then(
    function(users) {
      localStorage.setItem('users', JSON.stringify(users))
      console.log("Synced %i users with %i transactions", users.length, transactions.length)
      localStorage.setItem('transactions', '[]')
    },
    function(data) {
      console.error("Could not sync: server said " + data)
    }
  )
}

// temporarily shows a status
function showStatus (message, success = true) {
  const status = document.getElementById('status')

  // stop if the element doesn't exist
  if (status === null) return

  const tmp = status.innerHTML

  if (success) {
    status.innerHTML = '✓ ' + message
  } else {
    status.innerHTML = '✗ ' + message
  }

  setTimeout(function () {
    status.innerHTML = tmp
  }, 2000)
}
