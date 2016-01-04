var Wall = function(id, xCoord, yCoord) { 
    this.xCoord = xCoord * Wall.sideSize;
    this.yCoord = yCoord * Wall.sideSize;
    this.id = id; 
    this.damage = 5; 

    this.Create();
}

Wall.walls = [];
Wall.sideSize = 20;
Wall.wallsCount = 0;

Wall.prototype = {
    Create: function() {    
        var wall = $('<div class="wall" id="wallId_' + this.id + '"></div>').css({
            width: Wall.sideSize + 'px',
            height: Wall.sideSize + 'px',
            left: this.xCoord + 'px',
            top: this.yCoord + 'px'
        });

        $('#board').append(wall);

        Wall.wallsCount++;
        Wall.walls.push(this);
    },

    deleteObject: function(wallObj) {
        Wall.walls.forEach(function(wall, i, arr) {
            if(wall == wallObj) {
                Wall.walls.splice(i, 1);
                Wall.count -= 1;  
            };
        });         
    },

    deleteElement: function(wallObj) {
        $('#wallId_' + wallObj.id).remove();
    },  

    Render: function() {

    },   

}