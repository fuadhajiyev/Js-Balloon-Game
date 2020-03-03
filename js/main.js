function Game(){
    this.isPaused = true;
    this.score = 0;
    this.speed = null;
    this.density = null;
    this.remainingLives = 5;
    this.playElement = document.getElementById('start-btn');
    this.restartBtn = document.getElementById('restart-btn');
    this.scoreElement = document.getElementById('score-container');
    this.livesElement = document.getElementById('lives-container');
    this.canvasElement = document.getElementById('canvas');
    this.timer = null;
    this.startedTime = null; //time from start game
    this.intervalId = null;
    this.updateTime = null;
    this.densityStep = null;
    this.balloonsArray = null;
    this.maxBalloonsNumber = 45;
    let thiz = this;

    this.updater = function(){
      thiz.updateGame();
    };

  }

  Game.prototype.startGame = function(){
    go()
    this.playElement.style.display = "none";
    this.restartBtn.style.display = "none";
    
    this.intervalId = setInterval(this.updater, this.updateTime);
  };

  Game.prototype.pauseGame = function(){
    clearInterval(this.intervalId);
  };

  Game.prototype.updateScore = function(score){
    if(score == this.maxBalloonsNumber * 150){
        clearInterval(this.intervalId);
        showRestartButton();
        winnerCard();
    }
    this.scoreElem.innerHTML = score;
  };

  Game.prototype.updateGame = function(){
    this.densityStep += this.density;
    if(this.densityStep >= 1 && this.balloonsArray.length < this.maxBalloonsNumber)
    {
      for(let i = 0; i < parseInt(this.densityStep); i++)
      {
        var tempBalloon = new Balloon(0, -53, 150);
        let thiz = this;
        let index = this.balloonsArray.length;
        tempBalloon.element.onclick = function(){
          thiz.score += thiz.balloonsArray[index].points;
          thiz.updateScore(thiz.score);
          this.parentNode.removeChild(tempBalloon.element);
          playSound();
        };
        this.canvasElement.appendChild(tempBalloon.element);
        this.balloonsArray[index] = tempBalloon;
      }
      this.densityStep = 0;
    }

    for(let i = 0; i < this.balloonsArray.length; i++)
    {
      this.balloonsArray[i].element.style.bottom = (parseInt(this.balloonsArray[i].element.style.bottom) + 3.8 + this.balloonsArray[i].getRandomSpeed())+'px';
    }


    if(this.balloonsArray.length === this.maxBalloonsNumber){
      
      let counter = 0;
      for(let i = 0; i < this.maxBalloonsNumber; i++){
          let balloon = this.balloonsArray[i];
          let bottom = parseInt(balloon.element.style.bottom);
          let height = this.canvasElement.offsetHeight
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
    this.isPaused = true;
    this.score = 0;
    this.speed = 0.01;
    this.density = 0.25;  
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
      el.style.backgroundColor = this.color[Math.floor(Math.random() * (this.color.length - 1))];
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
  
  function go() {
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
      audio2.pause();
      go()
      let card = document.getElementById('card');
      card.style.display="none";
      restartGame.startGame();
      restartGame.updateScore(0);
    }
  }
  //winner game 
  function winnerCard() { 
      crowdCheer();
    let card = document.getElementById('card');
    card.style.display="block";

  }
  
  function crowdCheer() {
    let audio2 = document.getElementById("audio-2");
    audio2.play();
  }



