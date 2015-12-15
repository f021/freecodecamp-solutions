function sumFibs(num) {
  var sum = 0;
  function fib(n) {
    if (n === 0 || n === 1) return 1;
    return fib(n - 1) + fib(n - 2);
  }
  for(var i = 0; fib(i) <= num; i++) {
    if (fib(i) % 2 === 1) {
      sum += fib(i);
    }
  }
  return sum;
}

sumFibs(1000);