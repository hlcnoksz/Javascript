var board
var score = 0
var rows = 4
var columns = 4
var boardlarDizisi = []
var nextDizisi = []
var scoreDizisi = []
var nextScoreDizisi = []



window.onload = function () {
    setGame()
}

function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            //<div id="0-0"></div>
            let tile = document.createElement("div")
            tile.id = r.toString() + "-" + c.toString()
            let num = board[r][c]
            updateTile(tile, num)
            document.getElementById("board").append(tile)
        }
    }
    setTwo();
    setTwo();
    boardKayit(board)
}







function hasEmptyTile() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) {
                return true
            }
        }
    }
    return false;
}

function setTwo() {
    if (!hasEmptyTile()) {
        return  // Oyun bitti
    }

    //random r, c
    let r = Math.floor(Math.random() * rows)
    let c = Math.floor(Math.random() * columns)

    let found = false
    while (found == false) {
        if (board[r][c] == 0) {
            board[r][c] = 2

            let tile = document.getElementById(r.toString() + "-" + c.toString())
            tile.innerText = 2
            tile.classList.add("x2")

            found = true
        } else {
            r = Math.floor(Math.random() * rows);
            c = Math.floor(Math.random() * columns);
        }
    }
}

function updateTile(tile, num) {
    tile.innerText = ""
    tile.classList.value = ""
    tile.classList.add("tile")

    if (num > 0) {
        tile.innerText = num
        if (num <= 4096) tile.classList.add("x" + num.toString())
        else tile.classList.add("x8192")
    }
}




document.addEventListener("keyup", (e) => {
    nextDizisi = []
    if (e.code === "ArrowLeft") {
        slideLeft();
        setTwo();
    }
    else if (e.code === "ArrowRight") {
        slideRight();
        setTwo();
    }
    else if (e.code === "ArrowUp") {
        slideUp();
        setTwo();
    }
    else if (e.code === "ArrowDown") {
        slideDown();
        setTwo();
    }
    scoreDizisi.push(score)
    console.log(scoreDizisi)
    boardKayit(board)
    document.getElementById('score').innerText = score;
});

const backButton = document.querySelector("#back");
backButton.addEventListener("click", slideBack)

const nextButton = document.querySelector("#next")
nextButton.addEventListener("click", slideNext)


function boardKayit(board) {
    if (hasEmptyTile()) {
        // boardlarDizisi.push(board) yaparsan yine referans tipe uymamış olursun
        const boardCopy = board.map(row => [...row]); // Derinlemesine kopyala 
        boardlarDizisi.push(boardCopy); // Kopyalanan tahtayı ekle
        // console.log(boardlarDizisi);
    }

}


function slideBack() {
    if (boardlarDizisi.length > 1) {
        nextDizisi.push(boardlarDizisi[boardlarDizisi.length - 1].map(row => [...row]))
        boardlarDizisi.pop();
        // board = boardlarDizisi[boardlarDizisi.length - 1] Yaparsan herhangi bir tahtada yapılan değişiklikler diğerini etkiler. 
        board = JSON.parse(JSON.stringify(boardlarDizisi[boardlarDizisi.length - 1]));

        if (scoreDizisi !== []) {
            scoreDizisi.pop()
            nextScoreDizisi.push(scoreDizisi[scoreDizisi.length - 2])
            document.getElementById('score').innerText = scoreDizisi[scoreDizisi.length - 1]
        } else {
            document.getElementById('score').innerText = 0

        }

        // Tahtayı güncelle
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                let tile = document.getElementById(r.toString() + "-" + c.toString());
                let num = board[r][c];
                updateTile(tile, num);
            }
        }
    }
}

function slideNext() {
    const nextBoard = nextDizisi[nextDizisi.length - 1]
    board = nextBoard.map(row => [...row]);
    boardlarDizisi.push(nextDizisi.pop())


    document.getElementById('score').innerText = nextScoreDizisi.pop()


    // Tahtayı güncelle
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }

}





function filterZero(row) {
    // [2, 2, 2]
    return row.filter(num => num != 0)
}


//[0, 2, 2, 2]
function slide(row) {
    row = filterZero(row)  // [2, 2, 2]

    //Slide [4, 0, 2]
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2
            row[i + 1] = 0
            score += row[i]
        }
    }

    row = filterZero(row)  // [4, 2]

    //add zeroes [4, 2, 0, 0]
    while (row.length < columns) {
        row.push(0)
    }

    return row
}




function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r].slice();
        row = slide(row);
        board[r] = row;

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r]
        row.reverse()
        row = slide(row)
        row.reverse()
        board[r] = row

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString())
            let num = board[r][c]
            updateTile(tile, num)
        }
    }
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]]
        row = slide(row)

        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r]
            let tile = document.getElementById(r.toString() + "-" + c.toString())
            let num = board[r][c]
            updateTile(tile, num)
        }
    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]]
        row.reverse()
        row = slide(row)
        row.reverse()

        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r]
            let tile = document.getElementById(r.toString() + "-" + c.toString())
            let num = board[r][c]
            updateTile(tile, num)
        }
    }
}