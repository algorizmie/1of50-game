
const $table   = document.getElementById('table');
const $restart = document.getElementById('restart');
const $timer   = document.getElementById('timer');
const array    = makeArray(50);

let start      = 0,
    current    = 0,
    next       = 1,
    timer      = null,
    score      = 0,
    firstPart  = [],
    secondPart = [];

init();

$restart.addEventListener('click', function (){
    reset();
    init();
    stopTimer();
});

function init() {
    firstPart  = shuffle(array.slice(0,25));
    secondPart = shuffle(array.slice(25));
    const elements   = firstPart.map(createDom);
    elements.forEach(el => $table.append(el));
}

//Reset 
function reset() {
    start      = 0;
    current    = 0;
    next       = 1;
    score      = 0; 
    $table.innerHTML = "";
    $timer.innerHTML = "score: 0";
}

//Click Event
function click(cell) {
    cell.addEventListener('click', function() {
        current = this.innerHTML*1;
        if(current == next) {
            if(current == 1)
                startTimer();
            if(current <= 25) {
                this.innerHTML = secondPart[current-1]
            } else {
                this.innerHTML = '';
                this.style.background = 'white';
                if(current == 50)
                    winner();
            }
            next++;
        }
    })
}

//winner
function winner() {
    stopTimer();
}

//Create New Array
function makeArray(val) {
    let array = [];
    for (let i = 1; i <= val; i++) {
        array.push(i.toString());
    }
    return array;
}

//Create DIV .cell
function createDom(item) {
    const square = document.createElement("div");
    square.classList.add("cell");
    square.innerHTML = item;
    click(square);
    return square;
}

//Timer
function startTimer() {
    timer = setInterval(function(){
        score++;
        $timer.innerHTML = `score: ${score}`;
    }, 1000);
}
//Stop Timer
function stopTimer(){
    clearInterval(timer);
}

//Source: https://stackoverflow.com/questions/2450954
function shuffle(array) {
    var currentIndex = array.length, 
    temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
