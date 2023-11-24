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