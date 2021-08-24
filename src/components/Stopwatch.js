import React from 'react';

class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerOn: false,
      timerStart: 0,
      timerTime: 0,
    };
  }
  startTimer = () => {
    this.setState({
      timerOn: true,
      timertime: this.state.timerStart,
      timerStart: Date.now() - this.state.timerTime,
    });
    !this.state.timerOn &&
      (this.timer = setInterval(() => {
        // console.log(Date.now() - this.state.timerStart);
        this.setState({
          timerTime: Date.now() - this.state.timerStart,
        });
      }, 10));
  };

  stopTimer = () => {
    this.setState({
      timerOn: false,
    });
    clearInterval(this.timer);
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  resetTimer = () => {
    clearInterval(this.timer);
    this.setState({
      timerOn: false,
      timerStart: 0,
      timerTime: 0,
    });
  };

  render() {
    // console.log(this.state.timerTime);
    const { timerTime } = this.state;
    let centiseconds = ('0' + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ('0' + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ('0' + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ('0' + Math.floor(timerTime / 3600000)).slice(-2);

    // console.log(centiseconds, seconds, minutes, hours);
    return (
      <div className="border-2 relative p-5 bg-green-200 rounded">
        <button
          className="text-xl text-red-500 font-bold absolute right-2 top-2"
          onClick={() => this.props.close('stopwatch')}
        >
          X
        </button>
        <h1 className="text-xl text-center font-bold text-indigo-900">
          Stopwatch
        </h1>
        
        <div className="text-3xl text-center font-bold mb-10 mt-10">
          <span className="bg-gray-600 text-white px-3 py-2 mr-2 rounded ml-2">
            {hours}
          </span>
          :
          <span className="bg-gray-600 text-white px-3 py-2 mr-2 rounded ml-2">
            {minutes}
          </span>
          :
          <span className="bg-gray-600 text-white px-3 py-2 mr-2 rounded ml-2">
            {seconds}
          </span>
          :
          <span className="bg-gray-600 text-white px-3 py-2 mr-2 rounded ml-2">
            {centiseconds}
          </span>
        </div>
        <div className="flex justify-center">
          {this.state.timerOn === false && this.state.timerTime === 0 && (
            <button
              onClick={this.startTimer}
              className="bg-yellow-700 text-white px-3 py-2 rounded mr-5 hover:bg-green-600"
            >
              Start
            </button>
          )}
          {this.state.timerOn === true && (
            <button
              onClick={this.stopTimer}
              className="bg-yellow-700 text-white px-3 py-2 rounded mr-5 hover:bg-green-600"
            >
              Stop
            </button>
          )}
          {this.state.timerOn === false && this.state.timerTime > 0 && (
            <button
              onClick={this.startTimer}
              className="bg-yellow-700 text-white px-3 py-2 rounded mr-5 hover:bg-green-600"
            >
              Resume
            </button>
          )}
          {this.state.timerOn === false && this.state.timerTime > 0 && (
            <button
              onClick={this.resetTimer}
              className="bg-yellow-700 text-white px-3 py-2 rounded mr-5 hover:bg-green-600"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Stopwatch;
