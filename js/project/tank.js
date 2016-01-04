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
Tank.offsetValue = 1;
Tank.sideSize = 20;
Tank.tanksCount = 0;

Tank.prototype = {
    Create: function() {
        this.direction = Tank.DIRECTION[helper.randomIntFromZero(4)];

        var tank = $('<div class="tank" id="tankId_' + this.id + '"></div>').css({
            width: Tank.sideSize + 'px',
            height: Tank.sideSize + 'px',            
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

    checkObjCollision: function(Obj, objArr) { 
      self = this;

      objArr.forEach(function(object) {
        var x1 = self.xCoord,
            x2 = self.xCoord + Obj.sideSize,
            y1 = self.yCoord,
            y2 = self.yCoord + Obj.sideSize,
            x3 = object.xCoord,
            x4 = object.xCoord + Obj.sideSize,
            y3 = object.yCoord,
            y4 = object.yCoord + Obj.sideSize;

        if(self.id != object.id){
          if((y2 >= y3 && y2 <= y4) && ((x2 >= x3 && x2 <= x4) || (x1 <= x4 && x1 >= x3) || (x2 == x4))) {
            self.yCoord -= Tank.offsetValue;
          };

          if((y4 >= y1 && y4 <= y2) && ((x4 >= x1 && x4 <= x2) || (x3 <= x2 && x3 >= x1) || (x2 == x4))) {
            self.yCoord += Tank.offsetValue;           
          };

          if((x2 >= x3 && x2 <= x4) && ((y2 >= y3 && y2 <= y4) || (y1 <= y4 && y1 >= y3) || (y1 == y3))) {
            self.xCoord -= Tank.offsetValue;
          };    

          if((x4 >= x1 && x4 <= x2) && ((y4 >= y1 && y4 <= y2) || (y3 <= y2 && y3 >= y1) || (y1 == y3))) {
            self.xCoord += Tank.offsetValue;          
          };   

          if((y2 >= y3 && y2 <= y4) && (x2 == x4)) {
            self.yCoord -= Tank.offsetValue;
          }; 

          if((y4 >= y1 && y4 <= y2) && (x2 == x4)) {
            self.yCoord += Tank.offsetValue;
          };      

          if((x2 >= x3 && x2 <= x4) && (y1 == y3)) {
            self.xCoord -= Tank.offsetValue;
          }; 

          if((x4 >= x1 && x4 <= x2) && (y1 == y3)) {
            self.xCoord += Tank.offsetValue;          
          };                                        
        }
      }); 
    },     

    checkBorderCollision: function() {
        if(this.yCoord <= 0) { this.yCoord = 0; };
        if(this.yCoord >= board.height - Tank.sideSize) { this.yCoord = board.height - Tank.sideSize; };
        if(this.xCoord <= 0) { this.xCoord = 0; };
        if(this.xCoord >= board.width - Tank.sideSize) { this.xCoord = board.width - Tank.sideSize; };
    },

    deleteObject: function(tankObj) {
        console.log('del tank' + tankObj.id);
        Tank.tanks.forEach(function(tank, i, arr) {
            if(tank == tankObj) {
                tankObserver.unsubscribe(tankObj);
                Tank.tanks.splice(i, 1);
                Tank.count -= 1;  
            };
        });         
    },

    deleteElement: function(tankObj) {
        $('#tankId_' + tankObj.id).remove();
    },

    setTankDirection: function(direction) {
        if(!direction){
            if(helper.randomIntFromZero(100) > 75) {
                this.direction = Tank.DIRECTION[helper.randomIntFromZero(4)];
            };
        };
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
        if(this.id != 0) { this.setTankDirection(); };
        this.setArrowDirection(); 
        this.OffsetCalculate();
        this.checkBorderCollision();
        this.checkObjCollision(Tank, Tank.tanks); 
        this.checkObjCollision(Wall, Wall.walls); 
        this.Render();
    }
}