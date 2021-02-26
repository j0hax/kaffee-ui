 window.onload = function(){
     // quick test: add some users to our grid
     grid = document.getElementById("user-grid");
     
     for (i = 0; i < 500; i++) {
        // our grid element
        var gridElement = document.createElement("div");
        gridElement.className = "pure-u-1-3";
        
        // our name
        var name = document.createElement("div");
        name.innerHTML = "Name " + i;
        name.classList.add("user-button");
        
        gridElement.appendChild(name);
        grid.appendChild(gridElement);
        
        name.animate([
            // keyframes
            { transform: 'scalex(1)' },
            { transform: 'scalex(0)' },
            { transform: 'scalex(1)' }
        ], {
            easing: "ease-out",
            // timing options
            delay: i*25,
            //iterationStart: 0.5,
            duration: 250
        });
     }
}; 
