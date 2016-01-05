var Bullet = function(ownerId, id, xCoord, yCoord, direction) { 
    self = this;

    this.xCoord = xCoord; 
    this.yCoord = yCoord;
    this.id = id; 
    this.ownerId = ownerId; 
    this.direction = direction;

    this.Create();
}

Bullet.bullets = [];
Bullet.count = 0;
Bullet.sideSize = 6;
Bullet.damage = 25;
Bullet.offsetValue = 20;
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
            this.yCoord -= Bullet.offsetValue;
            break;
        case 'right':
            this.xCoord += Bullet.offsetValue;
            break;
        case 'bottom':
            this.yCoord += Bullet.offsetValue;
            break;
        case 'left':
            this.xCoord -= Bullet.offsetValue;
            break;         
        default:
            console.log('error bullrt direction definition');
            break;
        }
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
                Bullet.bullets.splice(i, 1);
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
            
            if(((y2 >= y3 && y2 <= y4) && ((x2 >= x3 && x2 <= x4) || (x1 <= x4 && x1 >= x3))) || 
              ((y4 >= y1 && y4 <= y2) && ((x4 >= x1 && x4 <= x2) || (x3 <= x2 && x3 >= x1))) ||
              ((x2 >= x3 && x2 <= x4) && ((y2 >= y3 && y2 <= y4) || (y1 <= y4 && y1 >= y3))) ||
              ((x4 >= x1 && x4 <= x2) && ((y4 >= y1 && y4 <= y2) || (y3 <= y2 && y3 >= y1)))) { 
                //if(tank.id != 0 && self.ownerId != 0) {
                    self.deleteObject(self);
                    self.deleteElement(self);
                    tank.deleteObject(tank);
                    tank.deleteElement(tank);
                //};                    
            };            
        });
    },  

    checkWallCollision: function() {   
        self = this;

        Wall.walls.forEach(function(wall, i, arr) {
            var x1 = self.xCoord,
                x2 = self.xCoord + Bullet.sideSize,
                y1 = self.yCoord,
                y2 = self.yCoord + Bullet.sideSize,
                x3 = wall.xCoord,
                x4 = wall.xCoord + Wall.sideSize,
                y3 = wall.yCoord,
                y4 = wall.yCoord + Wall.sideSize;
            
            if(((y2 >= y3 && y2 <= y4) && ((x2 >= x3 && x2 <= x4) || (x1 <= x4 && x1 >= x3))) || 
              ((y4 >= y1 && y4 <= y2) && ((x4 >= x1 && x4 <= x2) || (x3 <= x2 && x3 >= x1))) ||
              ((x2 >= x3 && x2 <= x4) && ((y2 >= y3 && y2 <= y4) || (y1 <= y4 && y1 >= y3))) ||
              ((x4 >= x1 && x4 <= x2) && ((y4 >= y1 && y4 <= y2) || (y3 <= y2 && y3 >= y1)))) {
                    self.deleteObject(self);
                    self.deleteElement(self);
                    wall.stamina -= 25;                    
                    wall.Render();                    
            };            
        });
    },  

    checkWallStamina: function() {   
        self = this;

        Wall.walls.forEach(function(wall, i, arr) {
            if(wall.stamina <= 0) {
                wall.deleteObject(wall);
                wall.deleteElement(wall);
            };
        });
    },                          

    Move: function() {
        this.offsetCalculate();
        this.checkBorderCollision();
        this.checkTankCollision();
        this.checkWallCollision();
        this.checkWallStamina();
        this.Render();      
    }    
}