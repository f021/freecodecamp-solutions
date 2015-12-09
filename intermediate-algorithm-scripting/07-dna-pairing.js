function pair(str) {
  var base = [['A','T'], ['C','G']];
  return str.split('').map(function(a) {
    return [a, base.filter(function(b) {
      return b.indexOf(a) !== -1;
    })[0].filter(function(b) {
      return a !== b;
    })[0]];
  });
}

pair("GCG");