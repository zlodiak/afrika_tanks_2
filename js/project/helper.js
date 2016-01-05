var Helper = function() {
    this.randomIntFromInterval = function(minInclusive, maxExclusive) {
        return Math.floor(Math.random() * (maxExclusive - minInclusive)) + minInclusive;
    };

    this.randomIntFromZero = function(maxExclusive) {
        return Math.floor(Math.random() * (maxExclusive));
    };  

    this.checkDeathPlayer = function(tanksArr) {
        for (var i = 0; i < tanksArr.length; i++) {
            if (tanksArr[i].id == 0) return false;
        }

        return true;
    }    

    this.checkDeathEnemies = function(tanksArr) {
        if((tanksArr.length == 1) && (tanksArr[0]).id == 0) {
            return true;
        }else{
            return false;
        };
    } 

    this.finalMessage = function(message) {
        $('#board').css({
            'font-size': '40px'
        }).html(message);

        setTimeout(function() { location.reload(); }, 3000);
    }          
};

