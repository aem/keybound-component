'use es6';

import CountKeys from '../example/CountKeys';
import expect from 'expect';
import jsdom from 'mocha-jsdom';
import jquery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

const createEvent = (code, hasCommandKey = false, hasShiftKey = false) => {
  return new window.KeyboardEvent('keydown', {
    code,
    ctrlKey: hasCommandKey,
    metaKey: hasCommandKey,
    shiftKey: hasShiftKey
  });
};


describe('Keybindings Test', function() {
  jsdom();
  let $ = null;

  before(() => {
    $ = jquery(window);
    const el = document.createElement('div');
    el.id = 'count-keys';
    document.childNodes[0].appendChild(el);
    ReactDOM.render(<CountKeys />, $('#count-keys')[0]);
  });

  after(() => {
    $('#count-keys').remove();
  });

  it('handles standard command+a', () => {
    const $el = $('h3#command-a');
    expect($el.text()).toBe('0');
    document.dispatchEvent(createEvent(65, true));
    expect($el.text()).toBe('1');
  });

  it('handles b+ctrl', () => {
    const $el = $('h3#command-b');
    expect($el.text()).toBe('0');
    document.dispatchEvent(createEvent(66, true));
    expect($el.text()).toBe('1');
  });

  it('handles command+shift+a', () => {
    const $el = $('h3#command-shift-a');
    expect($el.text()).toBe('0');
    document.dispatchEvent(createEvent(65, true, true));
    expect($el.text()).toBe('1');
  });

  it('handles shift+control+b', () => {
    const $el = $('h3#command-shift-b');
    expect($el.text()).toBe('0');
    document.dispatchEvent(createEvent(66, true, true));
    expect($el.text()).toBe('1');
  });

  it('handles A+shift', () => {
    const $el = $('h3#shift-a');
    expect($el.text()).toBe('0');
    document.dispatchEvent(createEvent(65, false, true));
    expect($el.text()).toBe('1');
  });

  it('handles default backspace', () => {
    const $el = $('h3#backspace');
    expect($el.text()).toBe('0');
    document.dispatchEvent(createEvent(8));
    expect($el.text()).toBe('3');
  });

  it('handles special characters', () => {
    const $el = $('h3#semi-colon');
    expect($el.text()).toBe('0');
    document.dispatchEvent(createEvent(186, true));
    expect($el.text()).toBe('1');
  });
});
