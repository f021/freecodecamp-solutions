function convert(str) {
  // &colon;&rpar;
  var entities = { '&': 'amp', '<': 'lt', '>' :'gt', '\'': 'apos', '\"': 'quot' };
  return str.replace(new RegExp('([\\' + Object.keys(entities).join('\\') + '])', 'g'), function(a) {
    return '&' + entities[a] + ';';
  });
}

convert("Dolce & Gabbana");