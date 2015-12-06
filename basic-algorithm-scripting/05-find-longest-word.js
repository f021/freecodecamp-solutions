function findLongestWord(str) {
  return str.split(' ').reduce(function(p,n) {
    return p.length > n.length ? p : n;
  }).length;
}

// with sort
function findLongestWordSort(str) {
  return str.split(' ').sort(function(a, b){
    return a.length < b.length;
  })[0].length;
}

// with Math.max
function findLongestWordMax(str) {
  return Math.max.apply(null, str.split(' ').map(function(e){
    return e.length;
  }));
}

findLongestWord("The quick brown fox jumped over the lazy dog");
findLongestWordSort("The quick brown fox jumped over the lazy dog");
findLongestWordMax("The quick brown fox jumped over the lazy dog");