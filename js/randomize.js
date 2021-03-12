// WARNING: demonstration code only!
localStorage.users = ''

for (let i = 0; i < 100; i++) {
  const name = 'Name ' + i
  const drinkCount = Math.floor(Math.random() * 100)
  const balance = Math.floor(Math.random() * 5000)
  add_user(name, drinkCount, balance)
}
