const $ = str => document.querySelector(str);

const getJSON = _ => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://www.freecodecamp.com/news/hot');
  xhr.send();
  xhr.onload = _ => {
    render(JSON.parse(xhr.responseText));
  };
}

const render = arr => {
  $('#news').innerHTML = '';
arr.filter(obj => { return new RegExp($('#str').value, 'gi').test(obj.headline + obj.author.username)})
    .forEach(obj => {
      let elm = document.createElement('li');
      elm.style.backgroundImage = `url(${obj.image || obj.author.picture})`;
      elm.innerHTML = `
      <div class='headline'>
        <a href='${obj.link}' target='_blank'>
          <h1>${obj.headline}</h1>
        </a>
      </div>
      <div class='details'>
        <p>
          <span>♥ ${obj.rank} points</span>
          <span>
            <a href='http://freecodecamp.com/${obj.author.username}' target='_blank'>@${obj.author.username}</a>
          </span>
        </p>
      </div>`
  $('#news').appendChild(elm);
  });
}

window.onload = getJSON;
$('#str').oninput = getJSON;
