$(document).ready(function() {
    var tanksArr = [],
        tanksCount = 6,
        xCoordTank,
        yCoordTank, 
        bulletsCount = 0, 
        bulletsArr = [], 
        boardWidth = 500,
        boardHeight = 300,
        borderBackground = 'orange';

    tankObserver = new TankObserver();
    bulletObserver = new BulletObserver();
    board = new Board(boardWidth, boardHeight, borderBackground);
    helper = new Helper();    

    // generate tanks
    for (var i = 0; i < tanksCount; i++) {
        xCoordTank = helper.randomIntFromZero(board.width - Tank.sideSize),
        yCoordTank = helper.randomIntFromZero(board.height - Tank.sideSize);   
        
        if(i != 0){
            // regular tank
            tanksArr[i] = new Tank(i, xCoordTank, yCoordTank);
            tankObserver.subscribe(tanksArr[i]);       
        }else{
            // player tank
            tanksArr[i] = new Tank(i, board.width - Tank.sideSize - 200, board.height - Tank.sideSize - 200);
            tanksArr[i].Move();
        };
    }

    // game loop
    setInterval(function() {
        // bullets conditional generate
        Tank.tanks.forEach(function(tank, i, arr) {
            bulletCreateProbably = helper.randomIntFromZero(1000);

            if((bulletCreateProbably >= 490) && (tank.id != 0)) { 
                bullet = new Bullet(
                    tank.id, 
                    bulletsCount,
                    tank.xCoord + ((Tank.sideSize - Bullet.sideSize) / 2),
                    tank.yCoord + ((Tank.sideSize - Bullet.sideSize) / 2),
                    tank.direction
                );
                bulletsArr.push(bullet);
                bulletsCount++;
                bulletObserver.subscribe(bullet);
            };                       
        });  

        // tanks move
        tankObserver.action();  

        // bullets move
        bulletObserver.action();

        // player move
        $(document).on('keydown', function(e){  
            if(e.which == 38){  
                console.log('up');
            }
            else if(e.which == 40){
                console.log('down');
            }
            else if(e.which == 37){
                console.log('left');
            }   
            else if(e.which == 39){
                console.log('right');
            };           
        });

        // condition of game over
        if(checkStatePlayer(Tank.tanks, 0)) {
            console.log('game over');
        };
    }, 500);    


    // player move
    $(document).on('keydown', function(e){  
        if(e.which == 38){  
            if(tanksArr[0].direction != 'up') {
                tanksArr[0].direction = 'up'
            }else{
                tanksArr[0].yCoord -= Tank.offsetValue;
                tanksArr[0].Move();
            };                        
        }
        else if(e.which == 40){
            if(tanksArr[0].direction != 'bottom') {
                tanksArr[0].direction = 'bottom'
            }else{
                tanksArr[0].yCoord += Tank.offsetValue;
                tanksArr[0].Move();
            };                       
        }
        else if(e.which == 37){
            if(tanksArr[0].direction != 'left') {
                tanksArr[0].direction = 'left'
            }else{
                tanksArr[0].xCoord -= Tank.offsetValue;
                tanksArr[0].Move();
            };        
        }   
        else if(e.which == 39){
            if(tanksArr[0].direction != 'right') {
                tanksArr[0].direction = 'right'
            }else{
                tanksArr[0].xCoord += Tank.offsetValue;
                tanksArr[0].Move();
            };        
        };           
    });
});