function translate(str) {
  return str.replace(/(^[^aioue]+)*(\w+)/i, function(_, a, b) {
    return (a ? b + a : b + 'w') + 'ay';
  });
}

translate("consonant");