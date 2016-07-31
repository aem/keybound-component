# keybound-component [![Build Status](https://travis-ci.org/aem/keybound-component.svg?branch=master)](https://travis-ci.org/aem/keybound-component)
This library contains a higher-order React component that you can use to wrap your own component, allowing you to easily add keybindings to your React application in a more declarative, idiomatic way.

For a simple, self-contained example, check out [CountKeys](https://git.hubteam.com/amarkon/keybound-component/blob/master/src/example/CountKeys.js).

### Why `keybound-component` over other solutions?
All other solutions on NPM have two main issues. Either...

1. They rely on Mixins and `React.createClass({})`, and while Mixins are convenient, Facebook has [plans to deprecate `React.createClass()`](https://github.com/reactjs/core-notes/blob/19b13888c8ef9890f96301d785aca78d69d90efa/2016-05/may-19.md) which will subsequently remove the Mixin functionality, or...
2. They rely on naming events with constants, and then `switch`ing on those event names to determine the proper action to take, which adds an unnecessary step in your event loop.

Creating a `KeyboundComponent` provides the most declarative, flexible, and reliable method of binding event listeners. Listeners can be added at any point in the code, whether you want listeners added on mount or not until a user interacts with a particular element on your page, all listeners are safely removed on unmount, and `keybound-component`'s simple API keeps your code clean and modular.

### `registerListener`
`registerListener(string, function)` is passed to the wrapped component as a prop, and accepts two arguments: the key command to listen to and a callback. 

The first argument is a plus-delimited string indicating the relevant modifier keys, if any, and a non-modifier key to trigger the event. Unmodified keys (think delete, or GitHub's "press T to search" functionality) are also supported. Modifier keys accepted are `cmd`, `command`, `ctrl`, `control`, and `shift`. This allows commands such as `a`, `cmd+a`, `ctrl+a`, `shift+a`, `cmd+shift+a`, etc.

The second argument is a callback to be executed when the key command from the first argument is recognized. Callbacks can use all of the typical React concepts (props, state, etc.) as the callbacks are automatically bound to the wrapped component.

Currently this HOC can reliably register command/control, shift, command/control+shift, and default (no modifier) with any alphanumeric key on the keyboard. This is order agnostic, and case insensitive (i.e. `'cmd+a' === 'cmd+A' === 'a+cmd' === 'a+cMd'`
etc).

Both command short-hand (`cmd`, `ctrl`) and long-form names (`command`, `control`) are accepted.

For the purposes of this plugin, key commands are cross-browser, cross-OS, meaning that both `cmd` and `ctrl` will map to the "command" key on a Mac and the "control" key on a PC. This is for simplicity's sake and to ensure that users across all platforms can use key commands in the same way they would within their respective OS. Simply, `'cmd+a' === 'ctrl+a'` inside of this plugin.

### Usage
```js
import React, { PropTypes } from 'react';
import KeyboundComponent from 'keybound-component';

const MyComponent = React.createClass({
  propTypes: {
    registerListener: PropTypes.func
  },

  componentDidMount() {
    this.props.registerListener('cmd+a', this.alertUser);
  },

  alertUser(e) {
    e.preventDefault();
    alert('you pressed command+a!');
  },

  render() {
    return <h2>press cmd+a</h2>;
  }
});

export default KeyboundComponent(MyComponent);
```
