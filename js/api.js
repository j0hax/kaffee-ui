/* API for interacting between Client and Server
 * Primary function is to provide access to the locally stored users array
 * and synchronise this with a server.
 * 
 * NOTE: Currently, only local operations are supported.
 */

// global drink price
const drinkPrice = 30;

// add a user
function add_user(name) {
    
    
    console.log("Adding user", name);
    
    var users = get_users();
    users.push(newUser);
    set_users(users);
}

function add_user(name, drinkCount, balance) {
    var newUser = {
        name: name,
        drinkCount: drinkCount,
        balance: balance,
        lastUpdate: Date.now()
    };
    
    console.log("Adding user", name);
    
    var users = get_users();
    users.push(newUser);
    set_users(users);
}

// User books a drink
function add_drink(element) {
    
    // extract the name
    username = element.innerHTML;
    
    let users = get_users();
    
    let foundUser = users.find(({ name }) => name === username);
    foundUser.drinkCount += 1;
    
    set_users(users);
    
    // add a visual notification
    element.classList.remove("confirmed");
    element.classList.add("confirmed");
    
    console.log("Booked a coffee for " + username);
}


// add balance to a user
function add_balance(user, balance) {
}

// subtract balance to a user
function sub_balance(user, balance) {
    add_balance(user, -(balance));
}

// sort users by their last modified date
function compare_users(a, b) {
    return b.lastUpdate - a.lastUpdate;
}

// get a list of users
function get_users() {
    // get our users, or an empty array if empty
    return JSON.parse(localStorage.getItem("users") || "[]").sort(compare_users);
}

// save a list of users
function set_users(users) {
    // parse to check if the input is valid
    if (!Array.isArray(users)) {
        console.error("Warning, set_users needs an array");
        return false;
    }    
    
    try {
        usersString = JSON.stringify(users);
        // save it
        return localStorage.setItem("users", usersString);
    } catch (e) {
        console.error("Unable to parse JSON!");
        return false;
    }
}
