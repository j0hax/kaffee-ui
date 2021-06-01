buffer = ""

// Keylistener for UUIDs/Barcodes
document.addEventListener('keydown', logKey)

function logKey (e) {
    
    if (e.key == 'Enter') {
        // search for users with this ID
        const users = get_users()
        const foundUser = users.find(user => buffer.toUpperCase() === user.transponder.toUpperCase())
        if (foundUser) {
            // if we have a match, book a drink
            console.log("Serial No. " + buffer + " belongs to " + foundUser.name)
            add_drink(foundUser.name)
        } else {
            showAlert("Unbekannte Karte")
        }
        
        // reset the buffer
        buffer = ""
    } else {
        buffer += e.key
    }
}
