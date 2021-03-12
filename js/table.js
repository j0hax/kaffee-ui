function updateTable() {
    const table = document.getElementById('table')
    const users = get_users()

    users.forEach(function (item, index, array) {
    row = table.insertRow()
    nameCell = row.insertCell()
    countCell = row.insertCell()
    balanceCell = row.insertCell()
    lastChange = row.insertCell()

    const euro = (item.balance - item.drinkCount * drinkPrice) / 100
    const lastUpdate = new Date(item.lastUpdate)

    nameCell.innerHTML = item.name
    countCell.innerHTML = item.drinkCount
    balanceCell.innerHTML = euro.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })

    if (euro <= -10) {
        balanceCell.classList.add('debt')
    }

    lastChange.innerHTML = lastUpdate.toLocaleString('de-DE')
    })
}

window.onload = updateTable();
