function diff(arr1, arr2) {
  // Same, same; but different.
  function set(arr1, arr2) {
    return arr1.filter(function(elm){
      return arr2.indexOf(elm) === -1;
    });
  }
  return set(arr1, arr2).concat(set(arr2, arr1));
}

diff([1, 2, 3, 5], [1, 2, 3, 4, 5]);