export const snakeDirections = {
  UP: 'UP',
  LEFT: 'LEFT',
  DOWN: 'DOWN',
  RIGHT: 'RIGHT',
};

export class Snake {
  blockSize = {height: 20, width: 20};
  direction = snakeDirections.RIGHT;
  positions = [];

  constructor({x, y}) {
    if (x === undefined || y === undefined) {
      throw new TypeError('Snake must be initialized with a valid x and y.');
    }

    this.positions.push({x, y});
  }

  /**
   * Calculates the next position the snake will move to.
   * @method calculateNextPosition
   * @return {{x: number, y: number}}
   */
  calculateNextPosition() {
    let {x, y} = this.positions[0];

    switch (this.direction) {
      case snakeDirections.UP:
        y -= this.blockSize.height;
        break;
      case snakeDirections.LEFT:
        x -= this.blockSize.width;
        break;
      case snakeDirections.DOWN:
        y += this.blockSize.height;
        break;
      case snakeDirections.RIGHT:
        x += this.blockSize.width;
        break;
    }

    return {x, y};
  }

  /**
   * Moves the snake to its next position.
   * @method move
   */
  move() {
    let nextPosition = this.calculateNextPosition();
    this.positions.unshift(nextPosition);
    this.positions.pop();
  }
}
