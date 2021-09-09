/* Functions used to update misc. dynamic content */

/* This function takes in the statistics object from the server */
function updateStatus(statistics) {
    
    // Update price
    config.drinkPrice = statistics.drinkPrice;
    
    const beans = document.getElementById("beaninfo")
    const con = document.getElementById("connection")
    const query = document.getElementById("queryinfo")
    const motd = document.getElementById("motd")
    
    beans.innerHTML = statistics.beanInfo.brand + " &bdquo;" + statistics.beanInfo.type + "&ldquo;"
    con.innerHTML = "Server ist " + (server_online ? ' online' : '<b>offline</b>')
    query.innerHTML = statistics.queryTime * 1000 + " Millisekunden"
    motd.innerHTML = statistics.motd
    
    document.getElementById("debug").textContent = JSON.stringify(statistics, null, 2)

    // Update the status at the bottom of each page
    const formatter = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
    });

    const contents = formatter.format(statistics.drinkPrice / 100)

    var statusBar = document.getElementById("status-bar");
    statusBar.innerHTML = `Kaffee Preis: ${contents} &bull; Kontaktperson: ${statistics.contact.name} (${statistics.contact.email})`
}
