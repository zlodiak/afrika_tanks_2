$(document).ready(function() {
    var tanksArr = [],
        tanksCount = 2,
        xCoordTank,
        yCoordTank, 
        bulletsCount = 0, 
        bulletsArr = [], 
        boardWidth = 60,
        boardHeight = 100,
        borderBackground = 'orange';

    tankObserver = new TankObserver();
    bulletObserver = new BulletObserver();
    board = new Board(boardWidth, boardHeight, borderBackground);
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
        Tank.tanks.forEach(function(tank, i, arr) {
            if(jQuery.inArray(tank, Tank.tanks) !== -1){
                bulletCreateProbably = helper.randomIntFromZero(1000);

                if(bulletCreateProbably >= 490){
                    bullet = new Bullet(
                        tank.id, 
                        bulletsCount,
                        tank.xCoord + ((Tank.sideSize - Bullet.sideSize) / 2),
                        tank.yCoord + ((Tank.sideSize - Bullet.sideSize) / 2)
                    );
                    bulletsArr.push(bullet);
                    bulletsCount++;
                    bulletObserver.subscribe(bullet);
                };            
            };            
        });  

        // bullets moves
        bulletObserver.action();
    }, 500);    

});