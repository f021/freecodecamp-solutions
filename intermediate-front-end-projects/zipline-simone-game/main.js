const audioUrls = ["http://markjackson.nl/sounds/E4.mp3", "http://markjackson.nl/sounds/A3.mp3","http://markjackson.nl/sounds/Csharp3.mp3", "http://markjackson.nl/sounds/E3.mp3"]
const audioNodes = audioUrls.map(e => new Audio(e))
const playground = ['#blue', '#red', '#green', '#yellow']
const sayYes = ['good', 'Ok', ':)']
const sayNo = ['no', 'lol', ':(', 'bad']
const WIN = 20
const TIME = 1000

const $ = str => document.querySelector(str)

const getRandomElm = arr =>
  arr[Math.floor(Math.random() * arr.length)]

const generateSequence = (seed, arr = []) => ({
    get() { return arr },
    next() {
      arr.push(getRandomElm(seed))
      return arr
    }
  })

const addZero = n =>
  '0'.repeat(2 - String(n).length) + n

const delay = ms => new Promise(
  (resolve, reject) => setTimeout(resolve, ms)
)

const playON = str => {
  $(str).classList.toggle('half');
  audioNodes[playground.indexOf(str)].play()
}

const playOFF = str => {
  $(str).classList.toggle('half');
  audioNodes[playground.indexOf(str)].pause()
  audioNodes[playground.indexOf(str)].currentTime = .0
}

const click = (str, ms) => new Promise(
  (resolve, reject) => {
    playON(str)
    delay(ms).then(() => {
      playOFF(str)
      return delay(ms - (ms / 100) * 20)
    }).then(() => resolve())
  }
)

const playSequence = (arr, cb) => {
  !arr.length
    ? cb()
    : click(arr[0], TIME - 50 * arr.length).then(() => playSequence(arr.slice(1), cb))
}

const listen = seq => new Promise(
    (resolve, reject) => {

      const whenClick = e => {
        let wrong = (seq[0] !== `#${e.target.id}`)
        $('#level').innerText = getRandomElm(wrong ? sayNo : sayYes);
          click(`#${e.target.id}`, 500).then(() => {
            if (wrong) {

                playground.forEach(e => $(e).removeEventListener('click', whenClick))
          delay(500).then(()=>{reject()})
            } else {
              seq.shift();
                    $('#level').innerText = addZero(seq.length);
            }
            if (seq.length === 0) {
              delay(1000).then(()=>{
                playground.forEach(e => $(e).removeEventListener('click', whenClick))
                resolve()})
          }
        })
      }
      // $('#simon').classList.toggle('can-click')
      $('#level').innerText = addZero(seq.length);
      playground.forEach(e => $(e).addEventListener('click', whenClick))
    }
  )

const go = seq => {
  playSequence(seq.next(), () =>
    listen(seq.get().slice())
    .then(() => go(seq))
    .catch((e)=>console.log(e)))
}

const reset = _ => {
  $('#level').dataset['level'] = 0;
  go(generateSequence(playground))
}

$('#start').addEventListener('click', reset)

module.exports = {generateSequence}
