const url = 'http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';

$('#str').on('input', function(){
  $('#wiki').html('');
  $.getJSON(url+$(this).val()+'&callback=?', data => {
    $('#wiki').html(Object.keys(data.query.pages).reduce((str, key) =>
      str +
`<a href='http://en.wikipedia.org/?curid=${data.query.pages[key].pageid}'>
  <li>
    <h2>${data.query.pages[key].title}</h2>
    <p>${data.query.pages[key].extract}</p>
  </li>
</a>`, ''))
  });
});
