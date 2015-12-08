function myReplace(str, before, after) {
  return str.replace(new RegExp(before, 'gi'), function(w){
    return (w.charCodeAt(0) < 97 ? after[0].toUpperCase() : after[0]) + after.slice(1);
  });
}

myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped");