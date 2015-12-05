function findLongestWord(str) {
  return str.split(' ').reduce(function(p,n) {
    return p.length > n.length ? p : n;
  }).length;
}

console.log(findLongestWord("The quick brown fox jumped over the lazy dog"));
