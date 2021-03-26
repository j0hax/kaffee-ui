/* API for interacting between Client and Server
 * Primary function is to provide access to the locally stored users array
 * and synchronise this with a server.
 *
 * NOTE: Currently, only local operations are supported.
 */

// global drink price
const drinkPrice = 30

// add a user
function add_user (name, drinkCount = 0, balance = 0) {
  const newUser = {
    name: name,
    drinkCount: drinkCount,
    balance: balance,
    lastUpdate: Date.now() / 1000
  }

  console.log('Adding user', name)

  const users = get_users()
  users.push(newUser)
  set_users(users)
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

// add balance to a user
function add_balance (user, balance) {
}

// subtract balance to a user
function sub_balance (user, balance) {
  add_balance(user, -(balance))
}

// sort users by their last modified date
function compare_users (a, b) {
  return b.lastUpdate - a.lastUpdate
}

// get a list of users
function get_users () {
  // get our users, or an empty array if empty
  return JSON.parse(localStorage.getItem('users') || '[]').sort(compare_users)
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
    return localStorage.setItem('users', usersString)
  } catch (e) {
    console.error('Unable to parse JSON!')
    return false
  }
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

// Sends and recieves the current 
function sync() {
    const users = get_users()
    const key = config.apiKey
    
    const data = {
        "apiKey": key,
        "users": users
    }
    
    window.fetch(config.server, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
        
    window.fetch(config.server)
    .then(response => response.json())
    .then(data => set_users(data));
}
