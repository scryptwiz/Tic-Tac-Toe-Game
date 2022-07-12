const playWithBtn = () => {
    document.getElementById('mid_choose').style.display="none";
    document.getElementById('pick_side').style.display="flex";
}

// Game Start
let cells = Array.from(document.getElementsByClassName('cell'))
const O_TEXT = 'O';
const X_TEXT = 'X';
let currentPlayer =  X_TEXT;
let spaces = Array(9).fill(null)

const start = () => {
    if (playerX.value === '' || playerO.value === '') {
        document.getElementById('winning_alert').style.display='flex';
        document.getElementById('alert-content').innerHTML = 'Please fill up the inputs to proceed';
        document.getElementById('alert_btn_cont').innerHTML+=`<button id="alert-btn-success" onclick="quits()">Ok</button>`
    } else {
        document.getElementById('pick_side').style.display="none";
        document.getElementById('game_cont').style.display="flex";
        cells.forEach(cell => cell.addEventListener('click', clickCell));
        player1.innerText=`${playerX.value}`
        player2.innerText=`${playerO.value}`
    }
}
const quits = () => {
    document.getElementById('winning_alert').style.display='none';
}
const toMain = () => {
    playerX.value = ''
    playerO.value = ''
    document.getElementById('pick_side').style.display = 'none';
    document.getElementById('mid_choose').style.display = 'flex'
}
const clickCell = (e) => {
    const id=e.target.id;
    if (!spaces[id]) {
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer
        if (playerWon() !==false) {
            let winning_blocks  = playerWon();
            winning_blocks.map(cell=>cells[cell].style.backgroundColor='#666')
            document.getElementById('winning_alert').style.display="flex";
            document.getElementById('alert-content').innerText=`${currentPlayer==='X' ? playerX.value : currentPlayer === 'O' ? playerO.value : null} has won!`;
            if (currentPlayer==='X') {
                let xplayer = Number(player_x_score.innerText)
                player_x_score.innerText = `${xplayer+1}`
            } else if (currentPlayer==='O') {
                let oplayer = Number(player_o_score.innerText)
                console.log(oplayer);
                player_o_score.innerText = `${oplayer+1}`
            }
            document.getElementById('alert_btn_cont').innerHTML=`<button id="alert-btn-success" onclick="restart()">Continue</button>`
            return
        } else if (spaces[0]!==null && spaces[1]!==null && spaces[2]!==null && spaces[3]!==null && spaces[4]!==null && spaces[5]!==null && spaces[6]!==null && spaces[7]!==null && spaces[8]!==null && spaces[9]!==null && playerWon()===false) {
            document.getElementById('winning_alert').style.display="flex";
            document.getElementById('alert-content').innerText=`It is a tie!`;
            document.getElementById('alert_btn_cont').innerHTML=`<button id="alert-btn-success" onclick="restart()">Continue</button>`
            return
        }
        currentPlayer = currentPlayer === X_TEXT? O_TEXT : X_TEXT
    }
}
const winningCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
]
const playerWon = () => {
    for (const condition of winningCombos) {
        let [a,b,c] = condition
        if(spaces[a] && (spaces[a] === spaces[b] && spaces[a] === spaces[c])) {
            return [a,b,c]
        }
    }
    return false
}
const restart = () => {
    spaces.fill(null)
    cells.forEach(cell=> {
        cell.innerText = ''
        cell.style.backgroundColor=''
    })
    currentPlayer = X_TEXT;
    document.getElementById('winning_alert').style.display="none";
}
const quit = () => {
    document.getElementById('winning_alert').style.display="flex";
    document.getElementById('alert-content').innerText=`Are You Sure You Want To Leave The Game`;
    document.getElementById('alert_btn_cont').innerHTML=`<button id="alert-btn-success" onclick="quitGame()">Proceed</button>
    <button id="alert-btn-danger" onclick="cancel()">Cancel</button>`
}
const cancel = () => {
    document.getElementById('winning_alert').style.display="none";
}
const quitGame =() => {
    playerX.value = ''
    playerO.value = ''
    player_x_score.innerText = `0`
    player_o_score.innerText = `0`
    document.getElementById('winning_alert').style.display="none";
    spaces.fill(null)
    cells.forEach(cell=> {
        cell.innerText = ''
        cell.style.backgroundColor=''
    })
    currentPlayer = X_TEXT;
    document.getElementById('game_cont').style.display="none";
    document.getElementById('mid_choose').style.display="flex";
}