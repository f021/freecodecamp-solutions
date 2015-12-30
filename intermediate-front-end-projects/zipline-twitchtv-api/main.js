const users = ["starladder1","freecodecamp", "medrybw", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];
const url = 'https://api.twitch.tv/kraken/';
const $ = str => document.querySelector(str);
const getName = str => str.match(/([\d\w-_]+$)/)[0];

const getJSON = url => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.onload = _ => xhr.status === 200
      ? resolve(JSON.parse(xhr.responseText))
      : reject(xhr.status);
    xhr.onerror = _ => reject(xhr.status);
  });
}

const getList = (str, db = users) => {
  return new Promise(resolve => {
    Promise.all(db.map(user => getJSON(url + str + user)))
      .then(user => resolve(user))
  })
}

const filterByName = user =>
  new RegExp('^' + $('#str').value, 'i').test(getName(user._links.channel));

const start = _ => {
  getList('streams/').then(streams => streams.filter(stream => filterByName(stream)))
  .then(streams => getList('users/', streams.map(stream => getName(stream._links.channel)))
    .then(users => render(users, streams.reduce((obj, user) => {
      obj[getName(user._links.channel)] = (user.stream !== null);
      return obj;
    }, {}))))
}

const filter = bool => bool && $('#on').checked || !bool && $('#off').checked;

const render = (users, status) => {
  document.querySelector('#users').innerHTML = users.filter(user =>
    filter(status[user.name])).map(user => `
      <li>
        <div class='title'>
          ${ user.logo ? `<img src='${user.logo || ''}'>` : '<span class="empty"></span>'}
          <a href='http://www.twitch.tv/${user.name}' target='_blank'>${user.display_name}</a>
          ${(status[user.name]) ? '<span class="green">&bull;</span>' : '<span class="red">&bull;</span>'}
        </div>
      ${user.bio ? `<div class='bio'><p>${user.bio}</p></div>` : ''}
      </li>`).join('');
}

['input', 'change'].forEach(e => {document.forms.ui.addEventListener(e, start)});
window.onload = start();
