score = 0;
//lives = 0;
levels = 0.1;
cross = true;
audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
$(document).ready(function(){
    $("#myModal").modal('show');
});
setTimeout(function() {
    $('#myModal').modal('hide');
    obstacle = document.querySelector('.obstacle');
    obstacle.classList.add('obstacleAni');
}, 6000);

function easy() {
    levels = 0.1;
}

function medium() {
  levels = 0.35;
}

function hard() {
  levels = 0.8;
}

function updateUserName(){
    welcomeMessage.innerHTML = "<u> Welcome "+document.getElementById("userName").value + "</u>"
}

document.onkeydown = function (e) {
    audio.play();
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) {
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 700);
    }
    if (e.keyCode == 39) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        console.log(dinoX);
        if(dinoX < 1580)
            dino.style.left = dinoX + 120 + "px";
    }
    if (e.keyCode == 37) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        console.log(dinoX);
        if(dinoX > -60)
            dino.style.left = (dinoX - 120) + "px";
    }
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "<b> Total Score "+ score +"</b> <br/><br/><br/><br/><br/> Game Over. Reloading ..."
        obstacle.classList.remove('obstacleAni');
        dino.classList.add('gameoverDino');
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
            location.reload(true);
            dino.classList.remove('gameoverDino')
        }, 1000);
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score, dx);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - levels;
            obstacle.style.animationDuration = newDur + 's';
        }, 500);

    }

}, 10);

function updateScore(score, dx) {
    scoreCont.innerHTML = "Your Score: " + score
    /*if(dx > 1200){
        lives += 40;
        liveCont.innerHTML = "Life Remaining: " + lives/40
    }*/
}