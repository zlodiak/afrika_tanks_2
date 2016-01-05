var Board = function(width, height) { 
    this.width = width;  
    this.height = height; 

    this.Create();
}

Board.prototype = {
  Create: function(){
    var board = $('<div class="board" id="board"></div>').css({
        width: this.width + 'px',
        height: this.height + 'px'
    });

    $('#game').append(board);
  }
}