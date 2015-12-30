function steamroller(arr) {
  // I'm a steamroller, baby
  return arr.reduce(function (arr, elm) {
    return arr.concat(Array.isArray(elm) ? steamroller(elm) : elm);
  }, []);
}

steamroller([1, [2], [3, [[4]]]]);