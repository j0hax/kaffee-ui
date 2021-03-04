/* API for interacting between Client and Server
 * Primary function is to provide access to the locally stored users array
 * and synchronise this with a server.
 * 
 * NOTE: Currently, only local operations are supported.
 */

// add a user
function add_user(name) {
    var newUser = {
        name: name,
        drinks: 0,
        balance: 0,
        lastUpdate: Date.now()
    };
    
    console.log("Adding user", name);
    
    var users = get_users();
    users.push(newUser);
    set_users(users);
}

function add_user(name, drinks, balance) {
    var newUser = {
        name: name,
        drinks: drinks,
        balance: balance,
        lastUpdate: Date.now()
    };
    
    console.log("Adding user", name);
    
    var users = get_users();
    users.push(newUser);
    set_users(users);
}

// add balance to a user
function add_balance(user, balance) {
}

// subtract balance to a user
function sub_balance(user, balance) {
    add_balance(user, -(balance));
}

// get a list of users
function get_users() {
    console.log("Retrieving locally stored users...");
    // get our users, or an empty array if empty
    return JSON.parse(localStorage.getItem("users") || "[]");
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
