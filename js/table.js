function updateTable (users) {
  const table = document.getElementById('overview')
  table.innerHTML = ''

  users.forEach(function (item, index, array) {
    row = table.insertRow()
    nameCell = row.insertCell()
    countCell = row.insertCell()
    balanceCell = row.insertCell()
    lastChange = row.insertCell()

    nameCell.innerHTML = item.name
    countCell.innerHTML = item.withdrawalCount.toLocaleString()
    balanceCell.innerHTML = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(item.balance / 100)

    if (item.balance <= -1000) {
      balanceCell.classList.add('debt')
    }

    lastChange.innerHTML = new Date(item.lastUpdate * 1000).toLocaleString('de-DE')
  })
}
