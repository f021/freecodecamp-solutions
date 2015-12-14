function spinalCase(str) {
  // "It's such a fine line between stupid, and clever."
  // --David St. Hubbins
  return str.replace(/([_\s-]|[a-z][A-Z])/g, function(a){
    return a.length == 2 ? a[0] + '-' + a[1] : '-';
  }).toLowerCase();
}

spinalCase('This Is Spinal Tap');