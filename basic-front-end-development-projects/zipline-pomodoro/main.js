const $ = str => document.querySelector(str);
const time = (elm = $('#time'), attr = "time") => elm.dataset[attr];
const addZero = n => '0'.repeat(2 - String(n).length) + n;
const set = n => {
  if (n >= 0 && n <= 59 * 60) {
    $('#time').dataset.time = n;
    $('#time').innerText = `${addZero(Math.floor(time()/60))}:${addZero(time()%60)}`;
  }
};
const inc = n => set(+time() + n);
const reset = _ => {set (25 * 60); $('#pause').checked = true;};
const done = _ => {alert('done!'); reset(); };

setTimeout(function go() {
  if ($('#start').checked && time() > 0) inc(-1);
  if (+time() === 0) done();
  setTimeout(go, 1000);
}, 1000);

module.exports = {inc, reset};
