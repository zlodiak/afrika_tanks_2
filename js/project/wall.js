var Wall = function(id, xCoord, yCoord) { 
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.id = id; 

    this.Create();
}

Wall.walls = [];
Wall.sideSize = 20;
Wall.wallsCount = 0;

Wall.prototype = {
    Create: function() {

    },

    deleteObject: function() {
        
    },

    deleteElement: function() {

    },  

    Render: function() {

    },   

}