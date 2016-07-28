/* global navigator */
const LETTERS = (() => {
  const letters = {};

  for (let i = 65; i <= 90; i++) {
    letters[String.fromCharCode(i).toUpperCase()] = i;
  }

  return letters;
})();

export const NUMBERS = (() => {
  const numbers = {};
  for (let i = 48; i <= 57; i++) {
    numbers[i - 48] = i;
  }
  return numbers;
})();


const NON_ALPHA_NUMERIC = {
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  SHIFT: 16,
  ESCAPE: 27,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  LEFT_ARROW: 37,
  UP_ARROW: 38,
  RIGHT_ARROW: 39,
  DOWN_ARROW: 40,
  INSERT: 45,
  DELETE: 46,

  NUM_PAD_0: 96,
  NUM_PAD_1: 97,
  NUM_PAD_2: 98,
  NUM_PAD_3: 99,
  NUM_PAD_4: 100,
  NUM_PAD_5: 101,
  NUM_PAD_6: 102,
  NUM_PAD_7: 103,
  NUM_PAD_8: 104,
  NUM_PAD_9: 105,

  MULTIPLY: 106,
  ADD: 107,
  SUBTRACT: 109,
  DECIMAL: 110,
  DIVIDE: 111,

  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  F7: 118,
  F8: 119,
  F9: 120,
  F10: 121,
  F11: 122,
  F12: 123,

  SEMI_COLON: 186,
  EQUALS: 187,
  COMMA: 188,
  DASH: 189,
  PERIOD: 190,
  FORWARD_SLASH: 191,
  GRAVE: 192,
  OPEN_BRACKET: 219,
  BACK_SLASH: 220,
  CLOSE_BRACKET: 221,
  SINGLE_QUOTE: 222
};

export const KEYS = { ...LETTERS, ...NUMBERS, ...NON_ALPHA_NUMERIC };

export function hasCommandKey(event) {
  return event[(navigator.userAgent.indexOf('Mac') !== -1) ? 'metaKey' : 'ctrlKey'];
}

export function hasShiftKey(event) {
  return event.shiftKey;
}
