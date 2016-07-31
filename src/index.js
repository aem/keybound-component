/* global document */
import React from 'react';
import { hasCommandKey, hasShiftKey, KEYS, NUMBERS } from './keys';

const keyboardEvents = {
  command: {},
  shift: {},
  commandShift: {},
  default: {}
};

const CMD = 'CMD';
const CMD_REGEX = /(CMD|COMMAND|CTRL|CONTROL)/;
const SHIFT = 'SHIFT';
let listenerAttached = false;

function buildCommandListener() {
  const handler = function handler(e) {
    let selectedEvents = keyboardEvents.default;

    if (hasCommandKey(e) && hasShiftKey(e)) {
      selectedEvents = keyboardEvents.commandShift;
    } else if (hasCommandKey(e) && !hasShiftKey(e)) {
      selectedEvents = keyboardEvents.command;
    } else if (hasShiftKey(e) && !hasCommandKey(e)) {
      selectedEvents = keyboardEvents.shift;
    }

    const callbacks = selectedEvents[e.keyCode] || selectedEvents[e.code];
    if (callbacks && callbacks.length) {
      callbacks.forEach(c => c());
    }
  };

  return {
    enable: function enable() {
      if (!listenerAttached) {
        document.addEventListener('keydown', handler);
        listenerAttached = true;
      }
      return this;
    },
    disable: function disable() {
      document.removeEventListener('keydown', handler);
      listenerAttached = false;
      return this;
    }
  };
}

const KeyboundComponent = WrappedComponent => class extends React.Component {
  componentDidMount() {
    this.keyboardListener = buildCommandListener();
    this.keyboardListener.enable();
  }

  componentWillUnmount() {
    this.keyboardListener.disable();
    this.keyboardListener = null;
  }

  registerListener(keys, callback) {
    if (typeof keys !== 'string' || typeof callback !== 'function') {
      return;
    }
    const parts = keys.toUpperCase().replace(CMD_REGEX, CMD).split('+');
    if (parts.length > 3) {
      return;
    }

    let modifiers = null;
    if (parts.indexOf(CMD) !== -1) {
      parts.splice(parts.indexOf(CMD), 1);
      modifiers = 'command';
    }
    if (parts.indexOf(SHIFT) !== -1) {
      parts.splice(parts.indexOf(SHIFT), 1);
      modifiers = modifiers ? `${modifiers}Shift` : 'shift';
    }
    if (parts.length > 1) {
      return;
    }
    modifiers = modifiers || 'default';
    if (!keyboardEvents[modifiers][KEYS[parts[0]]]) {
      keyboardEvents[modifiers][KEYS[parts[0]]] = [];
    }
    keyboardEvents[modifiers][KEYS[parts[0]]].push(callback);
    if (NUMBERS[parseInt(parts[0], 10) + 48]) {
      keyboardEvents[modifiers][KEYS[`NUM_PAD_${parts[0]}`]].push(callback);
    }
  }

  render() {
    return (
      <WrappedComponent
        {...this.props}
        registerListener={this.registerListener}
      />
    );
  }
};

export default KeyboundComponent;
