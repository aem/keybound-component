import KeyboundComponent from '../dist';
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
      backspace: 0
    };
  },

  componentDidMount() {
    const { registerListener } = this.props;
    registerListener('cmd+a', this.incrementCmdA);
    registerListener('b+ctrl', () => this.setState({ cmdB: this.state.cmdB + 1 }));
    registerListener('command+shift+a', () => this.setState({ cmdShiftA: this.state.cmdShiftA + 1 }));
    registerListener('shift+control+b', () => this.setState({ cmdShiftB: this.state.cmdShiftB + 1 }));
    registerListener('A+Shift', () => this.setState({ shiftA: this.state.shiftA + 1 }));
    registerListener('backspace', (e) => {
      // callbacks are passed the original event, so you can do normal
      // event things like prevent default behavior
      e.preventDefault();
      this.setState({ backspace: this.state.backspace + 1 });
    });
  },

  incrementCmdA() {
    this.setState({ cmdA: this.state.cmdA + 1 });
  },

  render() {
    const { cmdA, cmdB, cmdShiftA, cmdShiftB, shiftA, backspace } = this.state;

    return (
      <div>
        <h3 id="command-a">{cmdA}</h3>
        <h3 id="command-b">{cmdB}</h3>
        <h3 id="command-shift-a">{cmdShiftA}</h3>
        <h3 id="command-shift-b">{cmdShiftB}</h3>
        <h3 id="shift-a">{shiftA}</h3>
        <h3 id="backspace">{backspace}</h3>
      </div>
    );
  }
});

export default KeyboundComponent(CountKeys);
