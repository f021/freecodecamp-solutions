function chunk(arr, size) {
  // Break it up.

  return !arr.length
    ? []
    : [arr.slice(0, size)].concat(chunk(arr.slice(size), size));
}

console.log(chunk(["a", "b", "c", "d"], 2));