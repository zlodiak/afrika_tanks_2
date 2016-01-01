var Bullet = function(ownerId, id, xCoord, yCoord) { 
    self = this;

    this.xCoord = xCoord; 
    this.yCoord = yCoord;
    this.id = id; 
    this.ownerId = ownerId; 
    this.direction = undefined;

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
        // console.log('dir: ' + this.direction);
        if(!this.direction) {
            this.direction = Tank.tanks[this.ownerId].direction;
        };
    },

    checkBorderCollision: function() {
        if(this.yCoord <= 0) {
            this.yCoord = 0;
            this.deleteObject(this);
            this.deleteElement(this);

        };

        if(this.yCoord >= board.height - Tank.sideSize) {
            this.yCoord = board.height - Tank.sideSize + ((Tank.sideSize - Bullet.sideSize) / 2);
            this.deleteObject(this);
            this.deleteElement(this);
        };

        if(this.xCoord <= 0) {
            this.xCoord = 0;
            this.deleteObject(this);
            this.deleteElement(this);
        };

        if(this.xCoord >= board.width - Tank.sideSize) {
            this.xCoord = board.width - Tank.sideSize + ((Tank.sideSize - Bullet.sideSize) / 2);
            this.deleteObject(this);
            this.deleteElement(this);
        }; 
    },

    deleteObject: function(bulletObj) {
        Bullet.bullets.forEach(function(bullet, i, arr) {
            if(bullet == bulletObj) {
                bulletObserver.unsubscribe(bulletObj);
                delete Bullet.bullets[bulletObj.id];
                Bullet.count -= 1;  
            };
        });    
    }, 

    deleteElement: function(bulletObj) {
        $('#bulletId_' + bulletObj.id).remove();
    }, 

    checkTankCollision: function() {
        self = this;

        Tank.tanks.forEach(function(tank, i, arr) {
            var x1 = self.xCoord,
                x2 = self.xCoord + Bullet.sideSize,
                y1 = self.yCoord,
                y2 = self.yCoord + Bullet.sideSize,
                x3 = tank.xCoord,
                x4 = tank.xCoord + Tank.sideSize,
                y3 = tank.yCoord,
                y4 = tank.yCoord + Tank.sideSize;

                //console.log('tanks: ' + Tank.tanks);
                //console.log('tank id: ' + tank.id);
                //console.log('b: ' + x1 + '_' + y1 + ':' +  x2 + '_' + y1  + ':' +  x2 + '_' + y2  + ':' + x1 + '_' + y2);
                //console.log('t: ' + x3 + '_' + y3+ ':' +  x4 + '_' + y3  + ':' +  x4 + '_' + y4  + ':' + x3 + '_' + y4);
                //alert('tank id: ' + tank.id);


              if (((y2 >= y3 && y2 <= y4) && ((x2 >= x3 && x2 <= x4) || (x1 <= x4 && x1 >= x3))) || 
                  ((y4 >= y1 && y4 <= y2) && ((x4 >= x1 && x4 <= x2) || (x3 <= x2 && x3 >= x1))) ||
                  ((x2 >= x3 && x2 <= x4) && ((y2 >= y3 && y2 <= y4) || (y1 <= y4 && y1 >= y3))) ||
                  ((x4 >= x1 && x4 <= x2) && ((y4 >= y1 && y4 <= y2) || (y3 <= y2 && y3 >= y1)))) {
                    self.deleteObject(self);
                    self.deleteElement(self);
                    console.log('damage' + tank.id);
                    //tank.deleteElement(tank.tankId);
                    //tank.deleteObject(tank);
                  };            
        });
    },                    

    Move: function() {
      this.setBulletDirection();
      this.offsetCalculate();
      this.checkBorderCollision();
      this.checkTankCollision();
      this.Render();      
    }    
}