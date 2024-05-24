const board = document.getElementById('board')
const status = document.getElementById('status')
const cells = Array.from({ length: 9 })

let curentPlayer = 'X'
let winner = null

function Initialze() {
    winner = null
    curentPlayer = 'X'
    cells.fill(null)
    render()
    status.textContent = ''
}

function render() {
    board.innerHTML = ''
    cells.forEach((value, index) => {
        const cell = document.createElement('div')
        cell.classList.add('cell')
        cell.textContent = value || ''
        cell.addEventListener('click', () => handleCellClick(index))
        board.appendChild(cell)
    })
}

function handleCellClick(index) {
    if (cells[index] || winner) return
    cells[index] = curentPlayer
    if (checkWinner()) {
        winner = curentPlayer
    } else if (cells.every(cell => cell !== null)) {
        winner = 'draw'
    } else {
        curentPlayer = curentPlayer === "X" ? "O" : "X"
    }
    render()
    showStatus()
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    return winPatterns.some(pattern =>
        pattern.every(index => cells[index] === curentPlayer)
    )
}



function showStatus() {
    if (winner) {
        if (winner === "draw") {
            status.textContent = 'Ничья!!'
        } else {
            status.textContent = `Победил игрок ${curentPlayer}`
        }
    } else {
        status.textContent = `Ходит игрок ${curentPlayer}`
    }
}

Initialze()


