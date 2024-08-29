if( !localStorage.getItem("stats") )
    localStorage.setItem("stats", JSON.stringify({"winX": 0, "winO": 0, "draw": 0}));

updatestats();

const cells = document.querySelectorAll(".square");
let isCrossMove = true;

const poss_wins = [ [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6] ];

function isWin(){
    for( let i = 0; i < poss_wins.length; i++ ){
        let a = document.getElementById(poss_wins[i][0]);
        let b = document.getElementById(poss_wins[i][1]);
        let c = document.getElementById(poss_wins[i][2]);

        if( a.textContent != "" && a.textContent == b.textContent && b.textContent == c.textContent){
            cells.forEach( (cell) =>{
                cell.classList.add("game-end");
            });
            a.classList.add("win");
            b.classList.add("win");
            c.classList.add("win");
            return true;
        }    
    }

    return false;
}

function updatestats( key = undefined ){
    let stats = JSON.parse( localStorage.getItem("stats") );
    if( key !== undefined )
        stats[key]++;
    document.querySelector(".winX").innerHTML = stats.winX;
    document.querySelector(".winO").innerHTML = stats.winO;
    document.querySelector(".draw").innerHTML = stats.draw;
    localStorage.setItem("stats", JSON.stringify(stats) );
}

function isDraft(){
    let empty = 0;
    cells.forEach( (cell) =>{
        if( cell.textContent == "" )
            empty++;
    });
    if( empty == 0 ){
        cells.forEach( (cell) =>{
            cell.classList.add("game-end");
            cell.classList.add("draft");
        });
    }
    return empty == 0;
}

function reload(){
    setTimeout( () =>{
        location.reload();
    }, 2000);    
}

cells.forEach( (cell) => {
    cell.addEventListener("click", () => {
        if( cell.textContent == ""){
            if( isCrossMove ){
                cell.textContent = "X";
                if( isWin() ){
                    updatestats( "winX" );
                    reload();
                }
                else if( isDraft() ){
                    updatestats( "draw" );
                    reload();
                }
            
                isCrossMove = false;
            }else{
                cell.textContent = "O";
                if( isWin() ){
                    updatestats( "winO" );
                    reload();
                }
                else if( isDraft() ){
                    updatestats( "draw" );
                    reload();
                }

                isCrossMove = true;
            }
        }
    });
});


document.querySelector(".arrow").addEventListener("click", () => {
    var hiddenObject = document.querySelector(".histiry-res");
    
    if (hiddenObject.style.opacity == 0) {
        hiddenObject.style.opacity = 100;  
        document.querySelector(".arrow").innerHTML = `<i class="fa-solid fa-arrow-up"></i>`
    } else {
        hiddenObject.style.opacity = 0; 
        document.querySelector(".arrow").innerHTML = `<i class="fa-solid fa-arrow-down"></i>` 
    }
});


document.querySelector(".reset").addEventListener("click", () => {
    let currentstats = JSON.parse( localStorage.getItem("stats") );
    currentstats.winO = 0;
    currentstats.winX = 0;
    currentstats.draw = 0;
    localStorage.setItem("stats", JSON.stringify( currentstats) );
    updatestats();
});