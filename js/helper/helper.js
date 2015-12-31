var Helper = function() {
    this.randomIntFromInterval = function(minInclusive, maxExclusive) {
        return Math.floor(Math.random() * (maxExclusive - minInclusive)) + minInclusive;
    };

    this.randomIntFromZero = function(maxExclusive) {
        return Math.floor(Math.random() * (maxExclusive));
    };  
};


var Board = function(width, height, background) { 
    this.width = width;  
    this.height = height;
    this.background = background;  

    this.Create();
}

Board.prototype = {
  Create: function(){
    var board = $('<div class="board" id="board"></div>').css({
        width: this.width + 'px',
        height: this.height + 'px',
        background: this.background
    });

    $('#game').append(board);
  }
}

var BulletObserver = function(){
    this.handlers = [];
}
 
BulletObserver.prototype = {

    subscribe: function(bulletObject) {
        this.handlers.push(bulletObject);
    },
 
    unsubscribe: function(bulletObject) {
        this.handlers = this.handlers.filter(
            function(bullet) {
                if (bullet !== bulletObject) {
                    return bullet;
                }
            }
        );
    },
 
    action: function(){
        this.handlers.forEach(function(bullet){
            bullet.Move();
        });
    }
}

var TankObserver = function(){
    this.handlers = [];
}
 
TankObserver.prototype = {

    subscribe: function(tankObject) {
        this.handlers.push(tankObject);
    },
 
    unsubscribe: function(tankObject) {
        this.handlers = this.handlers.filter(
            function(tank) {
                if (tank !== tankObject) {
                    return tank;
                }
            }
        );
    },
 
    action: function(){
        this.handlers.forEach(function(tank){
            tank.Move();
        });
    }
}


var Tank = function(id, xCoord, yCoord) { 
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.id = id; 
    this.arrow; 
    this.direction;

    this.Create();
}

Tank.DIRECTION = ['up', 'right', 'bottom', 'left'];
Tank.tanks = [];
Tank.offsetValue = 10;
Tank.sideSize = 20;
Tank.tanksCount = 0;

Tank.prototype = {
    Create: function() {
        this.direction = Tank.DIRECTION[helper.randomIntFromZero(4)];

        var tank = $('<div class="tank" id="tankId_' + this.id + '"></div>').css({
            left: this.xCoord + 'px',
            top: this.yCoord + 'px'
        });

        $('#board').append(tank);

        Tank.tanksCount++;
        Tank.tanks.push(this);
    },

    toString: function() {
        return 'tankId: ' + this.tankId;
    },

    setArrowDirection: function() {
        switch (this.direction) {
        case 'up':
          this.arrow = '▲' + this.id;
          break;
        case 'right':
          this.arrow = '►' + this.id;
          break;
        case 'bottom':
          this.arrow = '▼' + this.id;
          break;
        case 'left':
          this.arrow = '◄' + this.id;
          break;         
        default:
          console.log('error set tank arrow direction');
          break;
        }
    },

    checkTankCollision: function() {
      self = this;

      Tank.tanks.forEach(function(tank) {
        var x1 = self.xCoord,
            x2 = self.xCoord + Tank.sideSize,
            y1 = self.yCoord,
            y2 = self.yCoord + Tank.sideSize,
            x3 = tank.xCoord,
            x4 = tank.xCoord + Tank.sideSize,
            y3 = tank.yCoord,
            y4 = tank.yCoord + Tank.sideSize;

        if(self.id != tank.id){
          if((y2 >= y3 && y2 <= y4) && ((x2 >= x3 && x2 <= x4) || (x1 <= x4 && x1 >= x3))){
            self.yCoord -= Tank.sideSize / 2;
            tank.xCoord += Tank.sideSize / 2;
          };

          if((y4 >= y1 && y4 <= y2) && ((x4 >= x1 && x4 <= x2) || (x3 <= x2 && x3 >= x1))){
            tank.xCoord -= Tank.sideSize / 2;
            self.yCoord += Tank.sideSize / 2;
          };

          if((x2 >= x3 && x2 <= x4) && ((y2 >= y3 && y2 <= y4) || (y1 <= y4 && y1 >= y3))){
            self.xCoord -= Tank.sideSize / 2;
            tank.xCoord += Tank.sideSize / 2;
          };    

          if((x4 >= x1 && x4 <= x2) && ((y4 >= y1 && y4 <= y2) || (y3 <= y2 && y3 >= y1))){
            tank.xCoord -= Tank.sideSize / 2;
            self.xCoord += Tank.sideSize / 2;
          };    
        }
      }); 
    }, 

    checkBorderCollision: function() {
        if(this.yCoord <= 0) { this.yCoord = 0; };
        if(this.yCoord >= 500 - Tank.sideSize) { this.yCoord = board.height - Tank.sideSize; };
        if(this.xCoord <= 0) { this.xCoord = 0; };
        if(this.xCoord >= 500 - Tank.sideSize) { this.xCoord = board.width - Tank.sideSize; };                        
    },

    deleteObject: function(tankObj) {

    },

    deleteElement: function(tankObj) {
        $('#tankId_' + tankObj.id).remove();
    },

    setTankDirection: function() {
        if(helper.randomIntFromZero(100) > 75) {
            this.direction = Tank.DIRECTION[helper.randomIntFromZero(4)];
        }
    },

    OffsetCalculate: function() {
        switch (this.direction) {
        case 'up':
            this.yCoord -= Tank.offsetValue;
            break;
        case 'right':
            this.xCoord += Tank.offsetValue;
            break;
        case 'bottom':
            this.yCoord += Tank.offsetValue;
            break;
        case 'left':
            this.xCoord -= Tank.offsetValue;
            break;        
        default:
            console.log('error tank Offset Calculate');
            break;
        }
    },     

    Render: function() {
        $('#tankId_' + this.id).css({
            left: this.xCoord + 'px',
            top: this.yCoord + 'px'
        }).html(this.arrow);
    },   

    Move: function() {
        this.setTankDirection();
        this.setArrowDirection(); 
        this.OffsetCalculate();
        this.checkBorderCollision();
        this.checkTankCollision(); 
        this.Render();
    }
}


var Bullet = function(ownerId, id, xCoord, yCoord) { 
    self = this;

    this.xCoord = xCoord; 
    this.yCoord = yCoord;
    this.id = id; 
    this.ownerId = ownerId; 
    this.direction; 

    this.Create();
}

Bullet.bullets = [];
Bullet.count = 0;
Bullet.sideSize = 6;
Bullet.damage = 100;
Bullet.speed = 20;
Bullet.background = 'lime';

Bullet.prototype = {

    Create: function() {
        var bullet = $('<div class="bullet" id="bulletId_' + this.id + '"></div>').css({
            width: Bullet.sideSize + 'px',
            height: Bullet.sideSize + 'px',
            background: Bullet.background,
            left: this.xCoord + 'px',
            top: this.yCoord + 'px'
        });

        $('#board').append(bullet);

        Bullet.count++;
        Bullet.bullets.push(this);
    },

    Render: function() {
        $('#bulletId_' + this.id).css({
            left: this.xCoord + 'px',
            top: this.yCoord + 'px'
        }).html(this.arrow);
    },

    offsetCalculate: function() {
        switch (this.direction){
        case 'up':
            this.yCoord -= Bullet.speed;
            break;
        case 'right':
            this.xCoord += Bullet.speed;
            break;
        case 'bottom':
            this.yCoord += Bullet.speed;
            break;
        case 'left':
            this.xCoord -= Bullet.speed;
            break;         
        default:
            console.log('error bullrt direction definition');
            break;
        }
    },

    setBulletDirection: function() {       
        if(this.direction == undefined){
            this.direction = Tank.tanks[this.ownerId].direction;
        };
    },

    checkBorderCollision: function() {
        if(this.yCoord <= 0) {
            this.yCoord = 0;
            this.deleteObject();
            this.deleteElement();

        };

        if(this.yCoord >= board.height - Tank.sideSize) {
            this.yCoord = board.height - Tank.sideSize + ((Tank.sideSize - Bullet.sideSize) / 2);
            this.deleteObject();
            this.deleteElement();
        };

        if(this.xCoord <= 0) {
            this.xCoord = 0;
            this.deleteObject();
            this.deleteElement();
        };

        if(this.xCoord >= board.width - Tank.sideSize) {
            this.xCoord = board.width - Tank.sideSize + ((Tank.sideSize - Bullet.sideSize) / 2);
            this.deleteObject();
            this.deleteElement();
        }; 
    },

    deleteObject: function() {
        Bullet.bullets.forEach(function(bullet, i, arr) {
            if(bullet == this) {
                delete Bullet.bullets[this.id]
            };
        });

        bulletObserver.unsubscribe(this);
        delete Bullet.bullets[this.id];
        Bullet.count -= 1;       
    }, 

    deleteElement: function() {
        $('#bulletId_' + this.id).remove();
    }, 

    checkTankCollision: function() {
/*        self = this; 

        Tank.tanks.forEach(function(tank, i, arr) {
            var x1 = self.xCoord,
                x2 = self.xCoord + Bullet.sideSize,
                y1 = self.yCoord,
                y2 = self.yCoord + Bullet.sideSize,
                x3 = tank.xCoord,
                x4 = tank.xCoord + Bullet.sideSize,
                y3 = tank.yCoord,
                y4 = tank.yCoord + Bullet.sideSize;

              if (((y2 >= y3 && y2 <= y4) && ((x2 >= x3 && x2 <= x4) || (x1 <= x4 && x1 >= x3))) || 
                  ((y4 >= y1 && y4 <= y2) && ((x4 >= x1 && x4 <= x2) || (x3 <= x2 && x3 >= x1))) ||
                  ((x2 >= x3 && x2 <= x4) && ((y2 >= y3 && y2 <= y4) || (y1 <= y4 && y1 >= y3))) ||
                  ((x4 >= x1 && x4 <= x2) && ((y4 >= y1 && y4 <= y2) || (y3 <= y2 && y3 >= y1)))) {
                    self.deleteObject();
                    self.deleteElement();
                    console.log('damage' + tank.id);
                    //tank.deleteElement(tank.tankId);
                    //tank.deleteObject(tank);
                  };            
        });*/
    },                    

    Move: function() {
      this.setBulletDirection();
      this.offsetCalculate();
      this.checkBorderCollision();
      // this.checkTankCollision();
      this.Render();      
    }    
}




$(document).ready(function() {
    var tanksArr = [],
        tanksCount = 6,   
        xCoordTank,
        yCoordTank, 
        bulletsCount = 0, 
        bulletsArr = [];   

    tankObserver = new TankObserver();
    bulletObserver = new BulletObserver();
    board = new Board(500, 500, 'orange');
    helper = new Helper();    

    // generate tanks
    for (var i = 0; i < tanksCount; i++) {
        xCoordTank = helper.randomIntFromZero(board.width - Tank.sideSize),
        yCoordTank = helper.randomIntFromZero(board.height - Tank.sideSize);   

        tanksArr[i] = new Tank(i, xCoordTank, yCoordTank);
        tankObserver.subscribe(tanksArr[i]);        
    }

    // game loop
    setInterval(function() {
        // tanks moves
        tankObserver.action();  

        // bullets conditional generate
        tanksArr.forEach(function(tank, i, arr) {
            bulletCreateProbably = helper.randomIntFromZero(1000);

            if(bulletCreateProbably >= 690){                
                bullet = new Bullet(tank.id, bulletsCount, tank.xCoord + 7, tank.yCoord + 7);
                bulletsArr.push(bullet);
                bulletsCount++;
                bulletObserver.subscribe(bullet);
            };            
        });  

        // bullets moves
        bulletObserver.action();

        // console.log('h: ' + bulletObserver.handlers + 'b: ' + Bullet.bullets);
/*        console.log(bulletObserver.handlers);
        console.log(Bullet.bullets);
        console.log(Bullet.count);
        console.log('-------------------');    */   

        // console.log(Bullet.length);
    }, 500);    

});