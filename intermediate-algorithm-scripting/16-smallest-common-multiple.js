function smallestCommons(arr) {
  
  var range = [];

  for(var i = Math.min.apply(null, arr); i <= Math.max.apply(null, arr); i++) {
    range.push(i);
  };

  for(var i = 2; ; i++) {
    if (range.every(function(a) {
      return i % a === 0;
    })) {
      return i;
    }
  }
}


console.log(smallestCommons([1,13]));