/*
GAME FUNCTION:
-Player must guess a number between a min and a max 
-Player gets a certain amount of guesses
-Notify player of guesses remaining
-Notify the player of the correct answer if he loses a guess
-Let player choose to play again
 */


//Game values
let min = 1,
    max = 50,
    winningNum = getRandomNum(min, max),
    guessesLeft = 6;

    //UI values
    const   game = document.querySelector('#game'),
            minNum = document.querySelector('.min-num'),
            maxNum = document.querySelector('.max-num'),
            guessBtn = document.querySelector('#guess-btn'),
            guessInput = document.querySelector('#guess-input'),
            noOfGuesses = document.querySelector('.no-of-guesses-left'),
            message = document.querySelector('.message');
     
//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;
noOfGuesses.textContent = guessesLeft;

//Play Again event Listener
game.addEventListener('mousedown', function(e) {
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

//Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value); 

    //validate
    if(isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
        return;
    }

    //check if won
    if(guess === winningNum) {
        ///game over --won
        gameOver(true,`${winningNum} is correct, YOU WIN!`);
    }
     else {
            //WRONG number
            guessesLeft -= 1;
            noOfGuesses.textContent = guessesLeft;

            

            if(guessesLeft === 0){
                //game over --lost 
                gameOver(false,`Game over, you lost.The correct number was ${winningNum}`);
            }
             
                
               else if(guess > winningNum) {
                            //change border color 
                        guessInput.style.border = '1px solid red';
                        //clear the input
                        guessInput.value = '';
                    setMessage(`${guess} is greater than the answer , ${guessesLeft} guesses left`, 'red');
                }
               else if(guess < winningNum) {
                            //change border color 
                        guessInput.style.border = '1px solid red';
                        //clear the input
                        guessInput.value = '';
                    setMessage(`${guess} is less than the answer , ${guessesLeft} guesses left`, 'red');
                }

    }
});

// game over
function gameOver(won,msg) {
    let color;
    won === true ? color = 'green' : color = 'red';
    //disable guessInput
    guessInput.disabled = true;
    //change border color 
    guessInput.style.borderColor = color;
    //set message
    setMessage(msg, color);

    //Play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again'; 
}

//set message 
function setMessage(msg,color){
    message.style.color = color;
    message.textContent = msg;
}

function getRandomNum(min,max) {
    return Math.floor(Math.random() *(max - min + 1) + min);
}