const xhr = new XMLHttpRequest();
const resize = elm => elm.style.height = elm.contentWindow.document.body.scrollHeight + 'px';
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition( position => {
    xhr.open('GET', `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&mode=html&APPID=9f428c75cbc93a1937e34d3a970f15f1`, true);
    xhr.send();
    xhr.onload = _ => {
      document.getElementById('weather').srcdoc = xhr.responseText;
    }
    xhr.onerror = _ => { console.log(xhr.status) }
  });
}

module.exports = {resize}
