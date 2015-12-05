function where(arr, num) {
  // Find my place in this sorted array.
  return arr.sort().reduce(function(pos, elm){
    return num > elm ? pos + 1 : pos;
  }, 0);
}

where([40, 60], 20);