import React, { Component } from "react";

class Countdown extends Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0
  };

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: this.state.timerTime
    });
    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 10;
      console.log(`Time left is 🚀 ${newTime}`);
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime
        });
      } else {
        clearInterval(this.timer);
        this.setState({ timerOn: false });
        alert("Countdown ended");
      }
    }, 10);
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ timerOn: false });
  };
  resetTimer = () => {
    clearInterval(this.timer);
    if (this.state.timerOn === false) {
      this.setState({
        timerTime: 0
      });
    }
  };

  adjustTimer = (input) => {
    const { timerTime, timerOn } = this.state;
    if (!timerOn) {
      if (input === "incHours" && timerTime + 3600000 < 216000000) {
        this.setState({ timerTime: timerTime + 3600000 });
      } else if (input === "decHours" && timerTime - 3600000 >= 0) {
        this.setState({ timerTime: timerTime - 3600000 });
      } else if (input === "incMinutes" && timerTime + 60000 < 216000000) {
        this.setState({ timerTime: timerTime + 60000 });
      } else if (input === "decMinutes" && timerTime - 60000 >= 0) {
        this.setState({ timerTime: timerTime - 60000 });
      } else if (input === "incSeconds" && timerTime + 1000 < 216000000) {
        this.setState({ timerTime: timerTime + 1000 });
      } else if (input === "decSeconds" && timerTime - 1000 >= 0) {
        this.setState({ timerTime: timerTime - 1000 });
      }
    }
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    const { timerTime, timerStart, timerOn } = this.state;
    let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
    let minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor((timerTime / 3600000) % 60)).slice(-2);

    return (
      <div className="border-2 relative p-5 bg-green-200 rounded w-80 ml-10">
        <button onClick={() => this.props.close("countdown")} className="text-xl text-red-500 font-bold absolute right-2 top-2">
          X
        </button>
        <h2 className="text-xl text-center font-bold text-indigo-900">Countdown</h2>
        <div className="flex justify-between"><span>Hours</span> : <span>Minutes</span> : <span>Seconds</span></div>
        <div className="flex flex-col items-center">      
          <div className="flex justify-between w-full mt-3 mb-5">
            <div className="flex flex-col items-center">
            <button onClick={() => this.adjustTimer("incHours")} className="">⬆</button>
          <span className="bg-gray-600 text-white px-3 py-2 mr-2 rounded ml-2">
            {hours}
          </span>
          <button onClick={() => this.adjustTimer("decHours")}>⬇</button>
          </div>
          :
          <div className="flex flex-col items-center">
          <button onClick={() => this.adjustTimer("incMinutes")}>⬆</button>
          <span className="bg-gray-600 text-white px-3 py-2 mr-2 rounded ml-2">
            {minutes}
          </span>
          <button onClick={() => this.adjustTimer("decMinutes")}>⬇</button>
          </div>
          :
          <div className="flex flex-col items-center">
          <button onClick={() => this.adjustTimer("incSeconds")}>⬆</button>
          <span className="bg-gray-600 text-white px-3 py-2 mr-2 rounded ml-2">
            {seconds}
          </span>
          <button onClick={() => this.adjustTimer("decSeconds")}>⬇</button>
          </div>
        </div>
        <div className="flex justify-between">
        {timerOn === false && (timerStart === 0 || timerTime === timerStart) && (
          <button className="bg-yellow-700 text-white px-3 py-2 rounded mr-5 hover:bg-green-600" onClick={this.startTimer}>
            Start
          </button>
        )}
        {timerOn === true && timerTime >= 1000 && (
          <button className="bg-yellow-700 text-white px-3 py-2 rounded mr-5 hover:bg-green-600" onClick={this.stopTimer}>
            Stop
          </button>
        )}
        {timerOn === false &&
          timerStart !== 0 &&
          timerStart !== timerTime &&
          timerTime !== 0 && (
            <button className="bg-yellow-700 text-white px-3 py-2 rounded mr-5 hover:bg-green-600" onClick={this.startTimer}>
              Resume
            </button>
          )}

        {(timerOn === false || timerTime < 1000) &&
          timerStart !== timerTime &&
          timerStart > 0 && (
            <button className="bg-yellow-700 text-white px-3 py-2 rounded mr-5 hover:bg-green-600" onClick={this.resetTimer}>
              Reset
            </button>
          )}
          </div>
      </div>
      </div>
    );
  }
}

export default Countdown;