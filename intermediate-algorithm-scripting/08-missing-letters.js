function fearNotLetter(str) {
  var shift = str.charCodeAt(0);
  var ch;
  for(var i = 1; i < str.length; i++) {
    ch = String.fromCharCode(shift+i);
    if (str[i] !== ch) {
      return ch;
    }
  }
  return undefined;
}

fearNotLetter("abce");