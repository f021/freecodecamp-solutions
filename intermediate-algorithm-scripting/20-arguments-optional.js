function add() {
  function isNum(n) {return typeof n === "number";}
  var as = [].slice.call(arguments, 0);
  if (!as.every(isNum)) return undefined;
  if (as.length > 1) return as.reduce(function(a,b) {return a +b;}, 0);
  return function(n) {
    if (!isNum(n)) return undefined;
    return as[0] + n;
  };
}

add(2,3);
