import KeyboundComponent from '../src/index';
import React, { PropTypes } from 'react';

const CountKeys = React.createClass({
  propTypes: {
    registerListener: PropTypes.func
  },

  getInitialState() {
    return {
      cmdA: 0,
      cmdB: 0,
      cmdShiftA: 0,
      cmdShiftB: 0,
      shiftA: 0,
      backspace: 0,
      semiColon: 0
    };
  },

  componentDidMount() {
    const { registerListener } = this.props;
    registerListener('cmd+a', this.incrementCmdA);
    registerListener('b+ctrl', () => this.setState({ cmdB: this.state.cmdB + 1 }));
    registerListener('command+shift+a', () => this.setState({ cmdShiftA: this.state.cmdShiftA + 1 }));
    registerListener('shift+control+b', () => this.setState({ cmdShiftB: this.state.cmdShiftB + 1 }));
    registerListener('A+Shift', () => this.setState({ shiftA: this.state.shiftA + 1 }));
    // you can have multiple casllbacks per key combination allowing, for example, the user
    // to display a notification in the UI and perform an async API call while keeping the code for
    // the two actions separate
    registerListener('backspace', () => this.setState({ backspace: this.state.backspace + 1 }));
    registerListener('backspace', () => this.setState({ backspace: this.state.backspace + 2 }));
    // symbols are supported
    registerListener('cmd+;', () => this.setState({ semiColon: this.state.semiColon + 1 }));
  },

  incrementCmdA() {
    this.setState({ cmdA: this.state.cmdA + 1 });
  },

  render() {
    const { cmdA, cmdB, cmdShiftA, cmdShiftB, shiftA, backspace, semiColon } = this.state;

    return (
      <div>
        <h3 id="command-a">{cmdA}</h3>
        <h3 id="command-b">{cmdB}</h3>
        <h3 id="command-shift-a">{cmdShiftA}</h3>
        <h3 id="command-shift-b">{cmdShiftB}</h3>
        <h3 id="shift-a">{shiftA}</h3>
        <h3 id="backspace">{backspace}</h3>
        <h3 id="semi-colon">{semiColon}</h3>
      </div>
    );
  }
});

export default KeyboundComponent(CountKeys);
