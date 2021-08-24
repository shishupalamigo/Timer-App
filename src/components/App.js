import React from 'react';
import Countdown from './Countdown';
import Stopwatch from './Stopwatch';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stopwatch: false,
      countdown: false,
    };
  }
  close = (key) => {
    this.setState({ [key]: false });
  };

  render() {
    return (
      <div className="">
        <h1 className="text-3xl font-bold text-center text-green-700">⏲️ Timers ⏲️</h1>
        <div className="flex justify-center mx-auto mt-10">
          {this.state.stopwatch ? (
            <Stopwatch close={this.close} />
          ) : (
            <button onClick={() => this.setState({ stopwatch: true })} className="px-3 py-2 font-bold bg-purple-800 text-white rounded mb-5 hover:bg-blue-700 shadow-lg mr-10">
              Show Stopwatch
            </button>
          )}
          {this.state.countdown ? (
            <Countdown close={this.close} />
          ) : (
            <button onClick={() => this.setState({ countdown: true })} className="px-3 py-2 font-bold bg-purple-800 text-white rounded mb-5 hover:bg-blue-700 shadow-lg ml-10">
              Show Countdown
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default App;
