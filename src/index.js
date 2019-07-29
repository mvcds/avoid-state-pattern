import React from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react";

import HeroineStore from "./HeroineStore";

import "./styles.css";

@observer
class App extends React.Component {
  render() {
    const { heroine } = this.props;

    return (
      <div className="App">
        <div>
          <div>Image: {heroine.image}</div>
          <div>
            Velocity: {heroine.velocity.x}, {heroine.velocity.y}
          </div>
          <div>Jumps?: {heroine.isJumping.toString()}</div>
          <div>Ducks?: {heroine.isDucking.toString()}</div>
          <div>Charge: {heroine.chargeTime}</div>
        </div>
        <div>
          <div>
            <strong>
              Hover the buttons to "press" them, move away to "release"
            </strong>
          </div>
          <button
            name="jump"
            onMouseEnter={heroine.handlePress}
            onMouseLeave={heroine.handleRelease}
          >
            Jump
          </button>
          <button
            name="duck"
            onMouseEnter={heroine.handlePress}
            onMouseLeave={heroine.handleRelease}
          >
            Duck
          </button>
        </div>
      </div>
    );
  }

  componentWillMount() {
    setInterval(this.props.heroine.update, 400);
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App heroine={new HeroineStore()} />, rootElement);
