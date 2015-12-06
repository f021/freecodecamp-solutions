
function convert(num) {

  var latinDic = { 0: '', 1: 'I', 5: 'V', 10: 'X', 50: 'L', 100: 'C', 500: 'D', 1000: 'M' };
  var template = [[0], [1], [1,1], [1,1,1], [1,5], [5], [5,1], [5,1,1], [5,1,1,1], [1,10]];

  return String(num).split('').reverse().map(function(n, i) {
    return template[+n].map(function(n) {
      return latinDic[n * Math.pow(10, i)];
    }).join('');
  }).reverse().join('');
}


convert(101);
