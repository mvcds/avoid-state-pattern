import { observable } from "mobx";

class HeroineStore {
  @observable image = "standing";
  @observable velocity = {
    x: 0,
    y: 0
  };
  @observable isJumping = false;
  @observable isDucking = false;
  @observable chargeTime = 0;

  handlePress = handleInput.bind(this, "press");
  handleRelease = handleInput.bind(this, "release");

  update = () => {
    if (this.image === "duck") {
      this.chargeTime++;
      if (this.chargeTime >= 10) {
        this.chargeTime = 0;
        this.superBomb();
      }
    } else {
      this.chargeTime = 0;
    }
  };

  superBomb() {
    console.log("boom!");
  }
}

async function handleInput(action, { target }) {
  const input = `${action}_${target.name}`;

  if (input === "press_jump") {
    // prevents double jumping
    if (!this.isJumping && !this.isDucking) {
      this.velocity.y += 5;
      this.image = "jumping";
      this.isJumping = true;
    }
  } else if (input === "release_jump") {
    if (this.isJumping) {
      this.velocity.y -= 5;
      this.image = "standing";
      this.isJumping = false;
    }
  } else if (input === "press_duck") {
    if (!this.isJumping) {
      this.image = "duck";
      this.isDucking = true;
      this.chargeTime = 0;
    } else {
      this.image = "dive";
      this.isJumping = false;
    }
  } else if (input === "release_duck") {
    if (this.isDucking) {
      this.image = "standing";
      this.isDucking = false;
      this.chargeTime = 0;
    }
  }
}

export default HeroineStore;
