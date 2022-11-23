const symbols = [
  ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del'],
  ['Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
  ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'Shift'],
  ['Ctrl', 'Win', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Ctrl'],
];

const engSymbols = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'],
  ['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'Shift'],
  ['Ctrl', 'Win', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Ctrl'],
];

const symbolsEventCode = [
  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
  ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete'],
  ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
  ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
  ['ControlLeft', 'Windows', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'],
];

const symbolsShift = [
  ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace'],
  ['Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'Del'],
  ['Caps Lock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter'],
  ['Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '↑', 'Shift'],
  ['Ctrl', 'Win', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Ctrl'],
];

// const engSymbolsShift = [
//   ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace'],
//   ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Del'],
//   ['Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter'],
//   ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '↑', 'Shift'],
//   ['Ctrl', 'Win', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Ctrl'],
// ];


const textarea = document.createElement('textarea');
document.body.append(textarea);
textarea.className = 'textarea';

const keyboardBlock = document.createElement('div');
keyboardBlock.className = 'keyboard';
document.body.append(keyboardBlock);

const numberOfKeys = [14, 15, 13, 13, 9];

const key = document.createElement('div');

for (let i = 0; i < 5; i += 1) {
  const row = document.createElement('div');
  row.className = 'row';
  keyboardBlock.appendChild(row.cloneNode(true));
}

const rows = keyboardBlock.querySelectorAll('.row');
let i = 0;

rows.forEach((r) => {
  for (let l = 0; l < numberOfKeys[i]; l += 1) {
    key.className = 'key';
    r.append(key.cloneNode(true));
  }
  i += 1;
});

const keys = keyboardBlock.querySelectorAll('.key');

let r = 0;
let c = 0;

keys.forEach((k) => {
  k.setAttribute('id', symbolsEventCode[r][c]);
  k.innerHTML = symbols[r][c];
  c += 1;
  if (c === symbols[r].length) {
    r += 1;
    c = 0;
  }

  k.onclick = function click() {
    if (k.innerHTML.length === 1 && k.innerHTML.match(/[а-яa-zё0-9]/i)) {
      textarea.value += k.innerHTML;
    }
    k.className = 'keyClicked';
    const change = function changeClass() {
      k.className = 'key';
    };
    setTimeout(change, 300);
    if (k.id === 'CapsLock') {
      keys.forEach((theKey) => {
        if (theKey.innerHTML.length === 1 && theKey.innerHTML.match(/[а-яa-zё]/g)) {
          theKey.innerHTML = theKey.innerHTML.toUpperCase();
        } else if (theKey.innerHTML.length === 1 && theKey.innerHTML.match(/[А-ЯA-ZЁ]/g)) {
          theKey.innerHTML = theKey.innerHTML.toLowerCase();
        }
      });
    }
  };
});

document.addEventListener('keydown', ((event) => {
  const pushedButton = document.getElementById(event.code);
  pushedButton.className = 'keyClicked';
  const change = function changeClass() {
    pushedButton.className = 'key';
  };
  setTimeout(change, 300);
}
));

let rus = true;
let control = false;

document.addEventListener('keydown', ((event) => {
  if (event.key === 'CapsLock') {
    keys.forEach((kCaps) => {
      if (kCaps.innerHTML.length === 1 && kCaps.innerHTML.match(/[а-яa-zё]/g)) {
        kCaps.innerHTML = kCaps.innerHTML.toUpperCase();
      } else if (kCaps.innerHTML.length === 1 && kCaps.innerHTML.match(/[А-ЯA-ZЁ]/g)) {
        kCaps.innerHTML = kCaps.innerHTML.toLowerCase();
      }
    });
  }
  if (event.code === 'ShiftLeft' && !control) {
    r = 0;
    c = 0;
    keys.forEach((kShiftL) => {
      kShiftL.innerHTML = symbolsShift[r][c];
      c += 1;
      if (c === symbolsShift[r].length) {
        r += 1;
        c = 0;
      }
    });
  }
  if (event.code === 'ShiftRight') {
    r = 0;
    c = 0;
    keys.forEach((keyShiftRigt) => {
      keyShiftRigt.innerHTML = symbolsShift[r][c];
      c += 1;
      if (c === symbolsShift[r].length) {
        r += 1;
        c = 0;
      }
    });
  }
  if (event.code === 'ControlLeft') {
    control = true;
  }
  if (event.code === 'ShiftLeft' && control) {
    r = 0;
    c = 0;
    if (rus) {
      keys.forEach((keyRusSwich) => {
        keyRusSwich.innerHTML = engSymbols[r][c];
        c += 1;
        if (c === engSymbols[r].length) {
          r += 1;
          c = 0;
        }
      });
      rus = false;
    } else {
      keys.forEach((keyEngSwich) => {
        keyEngSwich.innerHTML = symbols[r][c];
        c += 1;
        if (c === symbols[r].length) {
          r += 1;
          c = 0;
        }
      });
      rus = true;
    }
  }
}));


document.addEventListener('keyup', (event) => {
  if (event.code === 'ShiftLeft' && !control) {
    r = 0;
    c = 0;
    keys.forEach((keyEngSwich) => {
      keyEngSwich.innerHTML = symbols[r][c];
      c += 1;
      if (c === symbols[r].length) {
        r += 1;
        c = 0;
      }
    });
  }
  if (event.code === 'ShiftRight') {
    r = 0;
    c = 0;
    keys.forEach((keyRusSwich) => {
      keyRusSwich.innerHTML = symbols[r][c];
      c += 1;
      if (c === symbols[r].length) {
        r += 1;
        c = 0;
      }
    });
  }
  if (event.code === 'ControlLeft') {
    control = false;
  }
});
