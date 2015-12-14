function unite(arr1, arr2, arr3) {
  return [].slice.call(arguments, 0).reduce(function(ps, ns) {
    return ps.concat(ns.filter(function(n){
      return ps.indexOf(n) === -1;    
    }));
  }, []);
}

unite([1, 3, 2], [5, 2, 1, 4], [2, 1]);