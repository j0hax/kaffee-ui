// weird ringpuffer
        var buffer = new Array()
        buffer.push = function (){
            if (this.length >= 8) {
                this.shift();
            }
            return Array.prototype.push.apply(this,arguments);
        }
        
        // Keylistener for UUIDs/Barcodes
        document.addEventListener('keydown', logKey);

        function logKey(e) {
            buffer.push(String.fromCharCode(e.keyCode));
            
            idString = buffer.join('');
            
            // search for users with this ID
            let foundUser = users.find(user => idString.includes(user.serial));
            if (foundUser) {
                // if we have a match, book a drink and reset the buffer
                add_drink(foundUser.name);
                buffer.length = 0;
            }
        }
