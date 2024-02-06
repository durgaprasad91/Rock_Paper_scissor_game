let score =JSON.parse(localStorage.getItem('score')) || {
    win:0,
    losse:0,
    tie:0,
}

updatescoreElement();


let isAutoplay = false;
let interval;
function autoPlay(){
    if(!isAutoplay){
        interval = setInterval(function(){
             const playerMove = pickComputerMove();
             playGame(playerMove);
         },1000);
         isAutoplay = true;
     }else{
         clearInterval(interval);
         isAutoplay =false;
     }
}

document.querySelector('.js-rock-btn').addEventListener('click',()=>{
    playGame('Rock');
});

document.querySelector('.js-paper-btn').addEventListener('click',()=>{
    playGame('Paper');
});

document.querySelector('.js-scissor-btn').addEventListener('click',()=>{
    playGame('Scissors');
});

document.querySelector('.js-auto-play-button').addEventListener('click',()=>{
    autoPlay();
});
// Add an event listener for the reset score
// button using .addEventListener
document.querySelector('.js-reset-score-button').addEventListener('click', () => {
      resetScore();
});


document.body.addEventListener('keydown',(event)=>{

    if(event.key === 'r'){
        playGame('Rock');
    }else if(event.key === 'p'){
        playGame('Paper');
    }else if(event.key === 's'){
        playGame('Scissors')
    }else if(event.key === 'a'){
        autoPlay()
    }else if (event.key === 'Backspace') {
        resetScore();
        // Update 'Backspace' to show the
        // confirmation message instead of
        // resetting the score immediately.
        showResetConfirmation();
      }
})

    // Create a new resetScore function so
    // we can reuse this code.
    // See 12r.js for the full code.
    function resetScore() {
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        updatescoreElement();
    }
  

    document.querySelector('.js-reset-score-button')
    .addEventListener('click', () => {
        // Update the click event listener to
        // show the confirmation message instead
        // of restting the score immediately.
        showResetConfirmation();
    });

    // Function for showing the confirmation message.
    function showResetConfirmation() {
    document.querySelector('.js-reset-confirmation')
        .innerHTML = `
        Are you sure you want to reset the score?
        <button class="js-reset-confirm-yes reset-confirm-button">
            Yes
        </button>
        <button class="js-reset-confirm-no reset-confirm-button">
            No
        </button>
        `;
    
    // You could use onclick="..." in the HTML above,
    // but it's recommended to use .addEventListener()
    document.querySelector('.js-reset-confirm-yes')
        .addEventListener('click', () => {
        resetScore();
        hideResetConfirmation();
        });
    
    document.querySelector('.js-reset-confirm-no')
        .addEventListener('click', () => {  
        hideResetConfirmation();
        });
    }

    // A helper function (it helps us reuse the
    // code for hiding the confirmation message).
    function hideResetConfirmation() {
    document.querySelector('.js-reset-confirmation')
        .innerHTML = '';
    }

function playGame(playerMove){
    const computerMove =pickComputerMove();

    let result='';
    if(playerMove === 'Scissors'){
        if(computerMove==='Rock'){
            result='You lose';
            }else if(computerMove==='Paper'){
                result='You Win';
            }else if (computerMove==='Scissors'){
                result='Tie';
        }
        }else if(playerMove==='Paper'){  
            if(computerMove==='Rock'){
                result='You lose';
            }else if(computerMove==='Paper'){
                result='Tie';
            }else if (computerMove==='Scissors'){
                result='You Lose';
            }
        }else if(playerMove === 'Rock'){
            if(computerMove==='Rock'){
                result='Tie';
            }else if(computerMove==='Paper'){
                result='You lose';
            }else if (computerMove==='Scissors'){
                result='You win';
            }
        }
        if(result === 'You win'){
            score.win+=1;
        }else if(result === 'You lose'){
            score.losse+=1;
        }else if(result === 'Tie'){
            score.tie+=1;
        }

        localStorage.setItem('score',JSON.stringify(score))

        updatescoreElement();
        
        document.querySelector('.js-result').innerHTML =result;

        document.querySelector('.js-moves').innerHTML =`You
        <img src="../images/${playerMove}-emoji.png" class="move-icon">
        <img src="../images/${computerMove}-emoji.png" class="move-icon">
        Computer`;
    }
 
    function updatescoreElement(){
        document.querySelector('.js-score').innerHTML =`wins:${score.win}   lose:${score.losse}   tie:${score.tie}`;
    }
function pickComputerMove(){
    const randomNumber=Math.random();

    let computerMove='';

    if(randomNumber>=0 && randomNumber<1/2){
        computerMove='Rock';

    }else if (randomNumber>=1/2 && randomNumber<2/3){
        computerMove='Paper';

    }else if (randomNumber>=2/3 && randomNumber<1){
        computerMove='Scissors';
    }
    return computerMove;
}