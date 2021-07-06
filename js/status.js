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
    
    document.getElementById("debug").innerHTML = JSON.stringify(statistics, null, '\t')
}

/* Updates every element containing the class drink-price */
function updatePrices(price) {
  const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  });

  const contents = formatter.format(price / 100)

  var slides = document.getElementsByClassName("drink-price");
  for (var i = 0; i < slides.length; i++) {
    slides.item(i).innerHTML = contents;
  }
}
