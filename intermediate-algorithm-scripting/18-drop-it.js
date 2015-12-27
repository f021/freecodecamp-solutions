function drop(arr, func) {
  // Drop them elements.
  for (var i = 0; i < arr.length; i++) {
    if (func(arr[i])) return arr.slice(i);
  }
  return [];
}

drop([1, 2, 3], function(n) {return n >= 3; });