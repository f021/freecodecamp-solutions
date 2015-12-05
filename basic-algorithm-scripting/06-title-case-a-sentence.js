function titleCase(str) {
  return str.split(' ').map(function(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');
}

titleCase("I'm a little tea pot");
