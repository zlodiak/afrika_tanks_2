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

var TankObserver = function() {
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
