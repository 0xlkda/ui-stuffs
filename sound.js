var state = 'MUTE'

var frequency = 220
var volume = 0

var grossTune = 5
var mediumTune = 0.5
var fineTune = 0.05

var keyCodes = {
  80: { press: () => (frequency += grossTune) }, // p
  81: { press: () => (frequency -= grossTune) }, //q

  79: { press: () => (frequency += mediumTune) }, // o
  87: { press: () => (frequency -= mediumTune) }, // w

  73: { press: () => (frequency += fineTune) }, // i
  69: { press: () => (frequency -= fineTune) }, // e

  32: {
    press: () => {
      switch (state) {
      case 'MUTE':
        volume = 0.7
        state = 'PLAYING'
        break

      case 'PLAYING':
        volume = 0
        state = 'MUTE'
        break

      default:
        break
      }
    },
  },

  // 1 to 7
  49: { press: () => (frequency = note('C3')) },
  50: { press: () => (frequency = note('D3')) },
  51: { press: () => (frequency = note('E3')) },
  52: { press: () => (frequency = note('F3')) },
  53: { press: () => (frequency = note('G3')) },
  54: { press: () => (frequency = note('A3')) },
  55: { press: () => (frequency = note('B3')) },
  56: { press: () => (frequency = note('C4')) },
}

var generatePitches = (
  name,
  baseHz,
  octaveBase = 0,
  octaveRangeLimit = 8
) => {
  var pitches = []
  for (var i = octaveBase; i <= octaveRangeLimit; i++) {
    pitches[`${name}${i}`] = {
      frequency: baseHz * Math.pow(2, (12 * i) / 12),
    }
  }
  return pitches
}

var note = (name) => notes[name].frequency
var notes = {
  ...generatePitches('C', 16.35),
  ...generatePitches('D', 18.35),
  ...generatePitches('E', 20.6),
  ...generatePitches('F', 21.83),
  ...generatePitches('G', 24.5),
  ...generatePitches('A', 27.5),
  ...generatePitches('B', 30.87),
}

var audioCtx = new AudioContext()
var gainNode = audioCtx.createGain()
var oscillatorNode = audioCtx.createOscillator()

gainNode.connect(audioCtx.destination)
oscillatorNode.connect(gainNode)
oscillatorNode.start()

document.addEventListener('keydown', function (event) {
  audioCtx.resume()
  keyCodes[event.keyCode]?.press()
});

// UI
(function manualLoop() {
  function update() {
    document.getElementById('frequency').innerHTML = frequency.toFixed(2)
    document.getElementById('state').innerHTML = state

    gainNode.gain.value = volume
    oscillatorNode.frequency.value = frequency
  }

  update()
  requestAnimationFrame(manualLoop)
})()

function openKeyboard() {
  console.log('show')
  document.querySelector('input').focus()
}
