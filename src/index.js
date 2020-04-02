class Keyboard {
  constructor() {
    this.language = 1
    this.capsLock = false
    this.textarea = document.createElement('textarea')
    this.main = null
    this.keysContainer = null
  }

  init() {
    this.main = document.createElement('div')
    this.keysContainer = document.createElement('div')

    document.body.prepend(this.renderTextarea())

    this.main.classList.add('keyboard')
    this.keysContainer.classList.add('keyboard__keys')

    this.keysContainer.appendChild(this.renderKeyboard())
    this.main.appendChild(this.keysContainer)
    document.body.appendChild(this.main)
  }

  renderTextarea() {
    this.textarea.classList.add('textarea')
    return this.textarea
  }

  renderKeyboard() {
    const fragment = document.createDocumentFragment()
    const keyLayout = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0',
      'Backspace',
      'й',
      'ц',
      'у',
      'к',
      'е',
      'н',
      'г',
      'ш',
      'щ',
      'з',
      'х',
      'ъ',
      'Caps Lock',
      'ф',
      'ы',
      'в',
      'а',
      'п',
      'р',
      'о',
      'л',
      'д',
      'ж',
      'э',
      'Enter',
      'Shift',
      'я',
      'ч',
      'с',
      'м',
      'и',
      'т',
      'ь',
      'б',
      'ю',
      '?',
      'space',
    ]

    keyLayout.forEach(key => {
      const keyElement = document.createElement('button')
      keyElement.classList.add('keyboard__key')
      const insertLineBreak
        = ['Backspace', 'ъ', 'Enter', '?'].indexOf(key) !== -1

      switch (key) {
        case 'Backspace':
          keyElement.classList.add('keyboard__key--wide')
          keyElement.innerText = 'Backspace'
          keyElement.addEventListener('click', () => {
            this.textarea.value = this.textarea.value.substring(0, this.textarea.value.length - 1)
          })
          break
        case 'Caps Lock':
          keyElement.classList.add('keyboard__key--wide')
          keyElement.innerText = 'Caps Lock'
          break
        case 'space':
          keyElement.classList.add('keyboard__key--extra--wide')
          keyElement.innerText = '_________'
          keyElement.addEventListener('click', () => {
            this.textarea.value += ' '
          })
          break
        case 'Enter':
          keyElement.classList.add('keyboard__key--wide')
          keyElement.innerText = 'Enter'
          keyElement.addEventListener('click', () => {
            this.textarea.value += '\n'
          })
          break
        case 'Shift':
          keyElement.classList.add('keyboard__key--wide')
          keyElement.innerText = 'Shift'
          break
        default:
          keyElement.textContent = key.toLowerCase()
          keyElement.addEventListener('click', () => {
            this.textarea.value += key
          })
          break
      }
      fragment.appendChild(keyElement)
      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'))
      }
    })
    return fragment
  }
}

const keyboard = new Keyboard()

window.addEventListener('DOMContentLoaded', () => {
  keyboard.init()
})
