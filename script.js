const inputText = document.getElementById('text-input')
const speedInput = document.getElementById('speed-input')
const playButton = document.getElementById('play-button')
const pauseButton = document.getElementById('pause-button')
const resetButton = document.getElementById('reset-button')

let currentIndex

playButton.addEventListener('click', (event) => {
  if (speechSynthesis.paused && speechSynthesis.speaking) {
    speechSynthesis.resume()
  } else {
    const utterance = new SpeechSynthesisUtterance(inputText.value)

    utterance.rate = speedInput.value
    speechSynthesis.speak(utterance)

    if (speechSynthesis.speaking) {
      inputText.setAttribute('disabled', '')
    }

    utterance.addEventListener('end', (event) => {
      inputText.removeAttribute('disabled')
    })

    utterance.addEventListener('boundary', (event) => {
      currentIndex = event.charIndex
      console.log(currentIndex)
    })

    speedInput.addEventListener('change', (event) => {
      speechSynthesis.cancel()
      utterance.text = utterance.text.slice(currentIndex)
      console.log(utterance.text)
      utterance.rate = speedInput.value
      speechSynthesis.speak(utterance)
    })
  }
})

pauseButton.addEventListener('click', (event) => {
  if (speechSynthesis.speaking) {
    speechSynthesis.pause()
  }
})

resetButton.addEventListener('click', (event) => {
  speechSynthesis.resume()
  speechSynthesis.cancel()
  inputText.removeAttribute('disabled')
  inputText.value = ''
})
