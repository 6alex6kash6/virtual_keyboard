class Keyboard {
  constructor() {
    this.language = 1
    this.capsLock = false
    this.textarea = document.createElement('textarea')
    this.main = null
    this.keysContainer = null
    this.keys = []
    this.keyLayoutRus = [
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Backspace',
      'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '/',
      'Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
      'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', ',', '.', '?',
      'ru', 'space',
    ]
    this.keyLayoutEng = [
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Backspace',
      'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '/',
      'Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'Enter',
      'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?',
      'eng', 'space',
    ]
  }

  init() {
    this.main = document.createElement('div')
    this.keysContainer = document.createElement('div')

    document.body.prepend(this.renderTextarea())

    this.main.classList.add('keyboard')
    this.keysContainer.classList.add('keyboard__keys')

    this.keysContainer.appendChild(this.renderKeyboard(this.keyLayoutEng))
    this.main.appendChild(this.keysContainer)
    document.body.appendChild(this.main)

    this.keys = document.querySelectorAll('.keyboard__key')
  }

  renderTextarea() {
    this.textarea.classList.add('textarea')
    return this.textarea
  }

  renderKeyboard(keyLayout) {
    const fragment = document.createDocumentFragment()
    const createIconHTML = iconName => `<i class="material-icons">${iconName}</i>`

    keyLayout.forEach(key => {
      const keyElement = document.createElement('button')
      keyElement.classList.add('keyboard__key')
      const insertLineBreak
        = ['Backspace', '/', 'Enter', '?'].indexOf(key) !== -1

      switch (key) {
        case 'Backspace':
          keyElement.classList.add('keyboard__key--wide')
          keyElement.innerHTML = createIconHTML('backspace')
          keyElement.addEventListener('click', () => {
            this.textarea.value = this.textarea.value.substring(
              0,
              this.textarea.value.length - 1,
            )
          })
          break
        case 'Caps Lock':
          keyElement.classList.add('keyboard__key--wide')
          keyElement.innerHTML = createIconHTML('keyboard_capslock')
          keyElement.addEventListener('click', () => {
            this.toggleCapsLock()
            keyElement.classList.toggle('keyboard__key--active')
          })
          break
        case 'space':
          keyElement.classList.add('keyboard__key--extra--wide')
          keyElement.innerText = '______________'
          keyElement.addEventListener('click', () => {
            this.textarea.value += ' '
          })
          break
        case 'Enter':
          keyElement.classList.add('keyboard__key--wide')
          keyElement.innerHTML = createIconHTML('keyboard_return')
          keyElement.addEventListener('click', () => {
            this.textarea.value += '\n'
          })
          break
        case 'Shift':
          keyElement.classList.add('keyboard__key--wide')
          keyElement.innerHTML = '<span>Shift</span>'
          keyElement.addEventListener('mousedown', () => {
            this.keys.forEach(() => {
              keyElement.textContent.toUpperCase()
            })
            console.log('ff')
          })
          break
        default:
          keyElement.textContent = key.toLowerCase()
          keyElement.addEventListener('click', () => {
            this.textarea.value += this.capsLock
              ? key.toUpperCase()
              : key.toLowerCase()
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

  toggleCapsLock() {
    this.capsLock = !this.capsLock

    for (const key of this.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.capsLock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase()
      }
    }
  }
}

const keyboard = new Keyboard()

window.addEventListener('DOMContentLoaded', () => {
  keyboard.init()
})
