var Helper = function() {
    this.randomIntFromInterval = function(minInclusive, maxExclusive) {
        return Math.floor(Math.random() * (maxExclusive - minInclusive)) + minInclusive;
    };

    this.randomIntFromZero = function(maxExclusive) {
        return Math.floor(Math.random() * (maxExclusive));
    };  

    this.checkStatePlayer = function(array, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].id == value) return false;
        }

        return true;
    }    
};

