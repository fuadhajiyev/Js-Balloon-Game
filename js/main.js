function Game(){
    this.isFinished = true;
    this.score = 0;
    this.speed = null;
    this.density = null;
    this.remainingLives = 5;
    this.playElement = document.getElementById('start-btn');
    this.restartBtn = document.getElementById('restart-btn');
    this.scoreElement = document.getElementById('score-container');
    this.livesElement = document.getElementById('lives-container');
    this.ballPanelElement = document.getElementById('ball-panel');
    this.timer = null;
    this.startedTime = null; //time from start game
    this.intervalId = null;
    this.updateTime = null;
    this.densityStep = null;
    this.balloonsArray = null;
    this.maxBalloonsNumber = 56;
    let thiz = this;

    this.updater = function(){
      thiz.updateGame();
    };

  }

  Game.prototype.startGame = function(){
    startSound()
    this.playElement.style.display = "none";
    this.restartBtn.style.display = "none";

    this.intervalId = setInterval(this.updater, this.updateTime);
  };

  Game.prototype.finishGame = function(){
    clearInterval(this.intervalId);
    this.ballPanelElement.innerHTML = null;
  };
 
  Game.prototype.updateScore = function(score){
     let redBalloonsNumber = this.calcRedBalloonsCount()
    if(score == (this.maxBalloonsNumber - redBalloonsNumber) * 150){
        this.finishGame();
        showRestartButton();
        winnerCard();
    }
    
    this.scoreElem.innerHTML = score;
  };


  Game.prototype.calcRedBalloonsCount = function(){

    let count = 0;
    for(let i = 0; i < this.balloonsArray.length; i++ ){
      let  balloon = this.balloonsArray[i];
      const backgroundColor = balloon.element.style.backgroundColor;
      if(backgroundColor == 'red') count++;
    }
    return count;
  }



  Game.prototype.updateGame = function(){
    this.densityStep += this.density;
    if(this.densityStep >= 1 && this.balloonsArray.length < this.maxBalloonsNumber)
    {
      for(let i = 0; i < parseInt(this.densityStep); i++)
      {
        var tempBalloon = new Balloon(0, -53, 150);
        let thiz = this;
        let index = this.balloonsArray.length;
        let colorCheck = tempBalloon.element.style.backgroundColor
        
        tempBalloon.element.onclick = function(){

          if( colorCheck == 'red'){ 
            gameOver(thiz); 
            return;
          }
          
      
          this.parentNode.removeChild(tempBalloon.element);
          playSound();
          thiz.score += thiz.balloonsArray[index].points;
          thiz.updateScore(thiz.score);
        };
        this.ballPanelElement.appendChild(tempBalloon.element);
        this.balloonsArray[index] = tempBalloon;
      }
      this.densityStep = 0;
    }

    for(let i = 0; i < this.balloonsArray.length; i++)
    {
      this.balloonsArray[i].element.style.bottom = (parseInt(this.balloonsArray[i].element.style.bottom) + 5 + this.balloonsArray[i].getRandomSpeed())+'px';
    }

    if(this.balloonsArray.length === this.maxBalloonsNumber){
      
      let counter = 0;
      for(let i = 0; i < this.maxBalloonsNumber; i++){
          let balloon = this.balloonsArray[i];
          let bottom = parseInt(balloon.element.style.bottom);
          let height = this.ballPanelElement.offsetHeight
          if (bottom < height){
            break;
          }else{
            counter++;
          }
      }

      if  (this.balloonsArray.length === counter){
          clearInterval(this.intervalId);
          showRestartButton();
      }
    }

  };


  Game.prototype.initGame = function(){
    this.isFinished = false;
    this.score = 0;
    this.speed = 0.01;
    this.density = 0.15;  
    this.remainingLives = 5;
    this.updateTime = 50;
    this.densityStep = 1;
    this.balloonsArray = [];
    this.scoreElem = document.getElementById('score-count');

  };

  class Balloon{
    constructor(x, y, points){
      this.positionX = x;
      this.positionY = y;
      this.color = ['#d64161','red','blue','green'];
      this.points = points;
      this.element = this.createElement();
      
    }
 

    createElement(){
      var el = document.createElement('div');
      this.positionX = this.generateRandomXPos();
      el.className = 'balloon';
      el.id = 'balloon';
      el.style.backgroundColor = this.color[Math.floor(Math.random() * (this.color.length))];
      el.style.left = this.positionX+'px';
      el.style.bottom = this.positionY+'px';

      return el;
    }

    getRandomSpeed = function(){
      return Math.floor(Math.random() * 2);
      
    };

    generateRandomXPos = function(){
      let canvas = document.getElementById('canvas');
      return Math.floor(Math.random() * (canvas.offsetWidth - 40));
    };
  }

  
  window.addEventListener('load',function(){
    let startGame = new Game();
    startGame.initGame();

    document.getElementById('start-btn').onclick = function(){
      startGame.startGame();
    };
  });
  
  function startSound() {
    let audio3 = document.getElementById("audio-3");
    audio3.play();
  }



  function playSound() {
    let audio = document.getElementById("audio");
    audio.play();
  }

  function showRestartButton() {
    let restart = document.getElementById('restart-btn');
    restart.style.display="block";

    let restartGame = new Game();

    restartGame.initGame();

    restart.onclick= function(){
      let audio2 = document.getElementById("audio-2");
      let gameOver = document.getElementById("game-over");
      let card = document.getElementById('winner-card');
      gameOver.style.transform = "translateX(-100%)"; 
      audio2.pause();
      startSound()
      card.style.display="none";

      restartGame.startGame();
      restartGame.updateScore(0);
    }
  }

  //winner game sound
  function winnerCard() { 
      crowdCheer();
    let card = document.getElementById('winner-card');
    card.style.display="block";

  }
  
  function crowdCheer() {
    let audio2 = document.getElementById("audio-2");
    audio2.play();
  }

  // game over 

  function gameOver(instance){
    let gameOver = document.getElementById("game-over");
    let audio4 = document.getElementById("audio-4");
    gameOver.style.transform = "translateX(0%)"; 
    console.log('this', instance)
    instance.finishGame()
    showRestartButton()
    audio4.play();
      
  }

 

  


