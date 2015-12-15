function sumPrimes(num) {

 var ps = [2];
 var i;

  function primes() {
    var i = ps.slice(-1)[0];
    while(true) {
      if (ps.some(function(p) { 
        return i % p === 0;
      })) {
        i++;
      } else {
        return i;
       }
     }
  }

  while (true) {
    i = primes();
    if (i <= num) {
      ps.push(i);
    } else {
      return ps.reduce(function(a,b) {
        return a + b;
      });
    }
  }
}

sumPrimes(977);
