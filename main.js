let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

let cellSize = 50;
let boardWidth = 1000;
let boardHeight = 600;
let direction = "right";
let gameOver = false;
let score = 0;

let food = generateRandomFood(); //[x,y]

let snakeBody = [ [50,50] ];

document.addEventListener("keydown", (e) => {
    if(e.key === "ArrowLeft") direction = "left";
    else if(e.key === "ArrowUp") direction = "up";
    else if(e.key === "ArrowDown") direction = "down";
    else if(e.key === "ArrowRight") direction = "right";
    
});

function draw() {

    if(gameOver === true) {
        clearInterval(timerId);
        ctx.fillStyle = "red";
        ctx.font = "50px sans-serif";
        ctx.fillText("Game Over!!", 400, 300)
        return; //Neeche k statements execute na ho isliye return krdia taaki function se hi bahar nikal jaye
    }
    
    ctx.clearRect(0, 0, boardWidth, boardHeight);

    //draw snake
    for(let cell of snakeBody) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(cell[0], cell[1], cellSize, cellSize);
        ctx.strokeStyle = "red";
        ctx.strokeRect(cell[0], cell[1], cellSize, cellSize);
    }

    //draw random food
    ctx.fillStyle = "green";
    ctx.fillRect(food[0], food[1], cellSize, cellSize);

    //draw score
    ctx.font = "22px cursive";
    ctx.fillText(`Score: ${score}`, 30, 30);
}

function update() {
    let headX = snakeBody[snakeBody.length-1][0];
    let headY = snakeBody[snakeBody.length-1][1];

    let nextHeadX;
    let nextHeadY;

    if(direction === "right") {
        nextHeadX = headX + cellSize;
        nextHeadY = headY;

        //boundary condition
        if(nextHeadX === boardWidth || checkmate(nextHeadX, nextHeadY)) gameOver = true;

    } 
    else if(direction === "up") {
        nextHeadX = headX;
        nextHeadY = headY - cellSize;

        //boundary condition
        if(nextHeadY < 0 || checkmate(nextHeadX, nextHeadY)) gameOver = true;
        
    } 
    else if(direction === "down") {
        nextHeadX = headX;
        nextHeadY = headY + cellSize;

        //boundary condition
        if(nextHeadY === boardHeight || checkmate(nextHeadX, nextHeadY)) gameOver = true;

    } 
    else if(direction === "left") {
        nextHeadX = headX - cellSize;
        nextHeadY = headY;

        //boundary condition
        if(nextHeadX < 0 || checkmate(nextHeadX, nextHeadY)) gameOver = true;

    }

    snakeBody.push( [nextHeadX, nextHeadY] );

    //when the snake ate the food
    if(nextHeadX === food[0] && nextHeadY === food[1]) {
        food = generateRandomFood();
        score++;
    } else {
        snakeBody.shift();
    }
}

function generateRandomFood() {
    return [ //returning array [x,y]
        //x
        Math.round( (Math.random()*(boardWidth - cellSize)) / cellSize ) * cellSize,
        //y
        Math.round( (Math.random()*(boardHeight - cellSize)) / cellSize ) * cellSize
    ]
}

//When snake hits its own body
function checkmate(nextHeadX, nextHeadY) {
    for(let cell of snakeBody) {
        if(cell[0] === nextHeadX && cell[1] === nextHeadY) {
            return true;
        }
    }
    return false;
}

let timerId = setInterval( function() {
    update();
    draw();
}, 200)