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