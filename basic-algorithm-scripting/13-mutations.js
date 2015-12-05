function mutation(arr) {
  return arr[1].split('').every(function(char) {
    return new RegExp(char, 'i').test(arr[0]);
  });
}

mutation(["hello", "hey"]);
