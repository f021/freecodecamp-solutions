function destroyer(arr) {
  // Remove all the values
  var args = Array.prototype.slice.call(arguments, 1);
  return arr.filter(function(elm) {
    return args.indexOf(elm) === -1;
  });
}

destroyer([1, 2, 3, 1, 2, 3], 2, 3);
