// Click cell => get that cell's id => mark it => check for a win => if no, change turns

const cellsEl = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('reset-btn');
const turnMessage = document.getElementById('turn')
let isXTurn = true;
let gameState = ["","","","","","","","",""];
let isGameWon = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cellsEl.forEach((cell)=> {
    cell.addEventListener('click', function(){
        if(isGameWon === false){
            let cellIndex = Number(this.id.slice(4,5))
            if(gameState[cellIndex - 1] === ""){
            isXTurn ? cell.textContent = "X" : cell.textContent = "O"
            gameState[cellIndex - 1] = cell.textContent
            cell.classList.remove('unplayed-cell')
            checkWin()
            isGameWon ? "" : changeTurn()
        }}
    })
})

resetBtn.addEventListener('click', resetGame)


function checkWin() {
    for(let i = 0; i < winningConditions.length; i++){
        let winCondition = winningConditions[i]
        let a = gameState[winCondition[0]]
        let b = gameState[winCondition[1]]
        let c = gameState[winCondition[2]]
        
        if(a === '' || b === '' || c === ''){
            continue
        }else if(a === b && b === c){
            console.log(winCondition)
            cellsEl[winCondition[0]].classList.add('winner-cell')
            cellsEl[winCondition[1]].classList.add('winner-cell')
            cellsEl[winCondition[2]].classList.add('winner-cell')
            isGameWon = true
            winner = a
            updateTurnMessage(winner)

        }
    }
}

function changeTurn() {
    isXTurn = !isXTurn
    updateTurnMessage()
}

function updateTurnMessage(w) {
    if(isGameWon === true) {
        turnMessage.textContent = `${w} Wins!`
    }else{
        if(isXTurn){
            turnMessage.textContent = "It's X's Turn"
        }else{
            turnMessage.textContent = "It's O's Turn"
        }
    }
}

function resetGame() {
    isXTurn = true;
    gameState = ["","","","","","","","",""];
    isGameWon = false;
    turnMessage.textContent = "It's X's Turn"
    for(cell of cellsEl) {
        cell.textContent = "";
        cell.classList.add('unplayed-cell')
        cell.classList.remove('winner-cell')
    }
}