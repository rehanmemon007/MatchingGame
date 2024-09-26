var cardsArray = [
    { 'name': 'CSS', 'img': './images/css3-logo.png' },
    { 'name': 'HTML', 'img': './images/html5-logo.png' },
    { 'name': 'jQuery', 'img': './images/jquery-logo.png' },
    { 'name': 'JS', 'img': './images/js-logo.png' },
    { 'name': 'Node', 'img': './images/nodejs-logo.png' },
    { 'name': 'Photo Shop', 'img': './images/photoshop-logo.png' },
    { 'name': 'PHP', 'img': './images/php-logo_1.png' },
    { 'name': 'Python', 'img': './images/python-logo.png' },
    { 'name': 'Ruby', 'img': './images/rails-logo.png' },
    { 'name': 'Sass', 'img': './images/sass-logo.png' },
    { 'name': 'Sublime', 'img': './images/sublime-logo.png' },
    { 'name': 'Wordpress', 'img': './images/wordpress-logo.png' },
];

//duplicate cardArray to create a match for each card
var gameGrid = cardsArray.concat(cardsArray);

//Randomize game Grid on each load
gameGrid.sort(function () {
    return 0.5 - Math.random();
})

// grab the div with id game-board and assign to a variable game
var game = document.getElementById('game-board')

// create a section element and assign it to the variable grid
var grid = document.createElement('section')

// Give section element a class of grid
grid.setAttribute('class', 'grid')

// append the grid section to the game-board div
game.appendChild(grid)

// loop through each item in the cardsArray
for (var i = 0; i < gameGrid.length; i++) {
    // create a div element and assign to variable card
    var card = document.createElement('div')

    // Apply a card class to that div
    card.classList.add('card')

    // Set the data-name attribute of the div to the cardsArray name
    card.dataset.name = gameGrid[i].name

    // // Apply the background image of the div to the cardsArray image
    // card.style.backgroundImage = `url(${gameGrid[i].img})`

    // // Append the div to the grid section
    // grid.appendChild(card)
    
    // create front of card
    var front = document.createElement('div')
    front.classList.add('front')

    //create back of card
    var back = document.createElement('div')
    back.classList.add('back')
    back.style.backgroundImage = `url(${gameGrid[i].img})`;

    //append card to grid
    grid.appendChild(card)
    card.appendChild(front)
    card.appendChild(back)


}

var firstGuess = ''
var secondGuess = ''
// add match CSS
var match = function () {
    var selected = document.querySelectorAll('.selected')
    //loop through the array like object containing 'selected'
    for (var i = 0; i < selected.length; i++) {
        selected[i].classList.add('match')
    }
}

// Set count to 0
var count = 0
var previousTarget = null
var delay = 1200

//reset guesses after two attempts
var resetGuesses = function () {
    firstGuess = ''
    secondGuess = ''
    count = 0
    previousTarget = null;
    var selected = document.querySelectorAll('.selected')
    for (i = 0; i < selected.length; i++) {
        selected[i].classList.remove('selected')
    }
}

// add event lister to grid
grid.addEventListener('click', function (event) {
    // declare variable to target our clicked item
    var clicked = event.target
    //do not allow the grid section itself to be selected
    // only select divs inside the grid
    if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected')) {
        return
    }
    // we only want to add 'selectd' class if the current count
    if (count < 2) {
        count++;
        // // add selected class
        // clicked.classList.add('selected')
        if (count === 1) {
            firstGuess = clicked.parentNode.dataset.name
            clicked.parentNode.classList.add('selected')
        } else {
            secondGuess = clicked.parentNode.dataset.name
            clicked.parentNode.classList.add('selected')
        }
        //if both guesses are not empty
        if (firstGuess !== '' && secondGuess !== '') {
            //and the firstguess matches secondguess
            if (firstGuess === secondGuess) {
                // run the match function
                setTimeout(match, delay)
                setTimeout(resetGuesses, delay)
            } else {
                setTimeout(resetGuesses, delay)
            }
        }
        previousTarget = clicked
    }
})