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
  foundUser.drinkCount += 1
  foundUser.lastUpdate = Date.now() / 1000

  set_users(users)

  // console.log("Booked a coffee for " + username);
  showStatus('Kaffee für ' + username + ' gebucht.')
}

// sort users by their last modified date
function compare_users (a, b) {
  return b.lastUpdate - a.lastUpdate
}

// get a list of users
function get_users () {
    sync_users();
    return JSON.parse(localStorage.getItem('users') || '[]')
}

// save a list of users
function set_users (users) {
  // parse to check if the input is valid
  if (!Array.isArray(users)) {
    console.error('Warning, set_users needs an array')
    return false
  }

  try {
    usersString = JSON.stringify(users)
    // save it
    localStorage.setItem('users', usersString)
  } catch (e) {
    console.error('Unable to parse JSON!')
  }
  
  sync_users();
}

// sends data to the server, and uses the servers response as the new data
function sync_users () {
  // get our users, or an empty array if empty
  const users = JSON.parse(localStorage.getItem('users') || '[]')

  // send out users to the server, if possible
  const key = config.apiKey

  const data = {
    apiKey: key,
    users: users
  }

  window.fetch(config.server, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      // updated_users = JSON.parse(data)
      if (!Array.isArray(data)) {
        throw 'Error, wrong data type! Check authentication.'
      }

      localStorage.setItem('users', JSON.stringify(data))
      console.log('Successfully synced ' + data.length + ' users')
    })
    .catch((error) => {
      console.error('Error:', error)
    })
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
