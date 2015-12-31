var Board = function(width, height, background) { 
    this.width = width;  
    this.height = height;
    this.background = background;  

    this.Create();
}

Board.prototype = {
  Create: function(){
    var board = $('<div class="board" id="board"></div>').css({
        width: this.width + 'px',
        height: this.height + 'px',
        background: this.background
    });

    $('#game').append(board);
  }
}