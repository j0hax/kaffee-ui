// WARNING: demonstration code only!
localStorage.users = "";
        
for (var i = 0; i < 100; i++) {
	var name = "Name " + i;
	var drinkCount = Math.floor(Math.random() * 100);
	var balance = Math.floor(Math.random() * 5000);
	add_user(name, drinkCount, balance);
}
