var Helper = function() {
    this.randomIntFromInterval = function(minInclusive, maxExclusive) {
        return Math.floor(Math.random() * (maxExclusive - minInclusive)) + minInclusive;
    };

    this.randomIntFromZero = function(maxExclusive) {
        return Math.floor(Math.random() * (maxExclusive));
    };  
};