function where(collection, source) {
  // What's in a name?
  return collection.filter(function(obj) {
    return Object.keys(source).every(function(key) {
      return source[key] === obj[key];
    });
  });
}

where([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });