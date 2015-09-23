import {Component, View} from 'angular/annotations';
import {keyCodes} from 'helpers/keycodes.js';
import {Snake, snakeDirections} from 'components/snake/snake.js';
import {SnakeDot} from 'components/snake-dot/snake-dot.js';

@Component({
  host: {
    'tabindex': '0',
    '(onkeydown)': 'onKeyDown($event)',
  },
  selector: 'snake-game',
})
@View({
  directives: [SnakeDot],
  styleUrls: ['components/snake-game/snake-game.scss'],
  templateUrl: 'components/snake-game/snake-game.html',
})
export class SnakeGame {
  constructor($element, $scope) {
    this.animationFrameID = -1;
    this.boundingClientRect = $element[0].getBoundingClientRect();
    this.clock = 0;
    this.snake = new Snake({x: 0, y: 0});
    this.$scope_ = $scope;

    this.updateGameState();
  }

  /**
   * Key down handler.
   * @method onKeyDown
   * @param  {Event} event The key down event.
   * @return {void}
   */
  onKeyDown(event) {
    switch (event.keyCode) {
      case keyCodes.UP:
        this.snake.direction = snakeDirections.UP;
        break;
      case keyCodes.LEFT:
        this.snake.direction = snakeDirections.LEFT;
        break;
      case keyCodes.DOWN:
        this.snake.direction = snakeDirections.DOWN;
        break;
      case keyCodes.RIGHT:
        this.snake.direction = snakeDirections.RIGHT;
        break;
    }
  }

  /**
   * Updates the game state.
   * @method updateGameState
   * @return {void}
   */
  updateGameState() {
    this.clock ++;

    if (this.clock === 9) {
      this.clock = 0;
      this.snake.move();
      this.$scope_.$digest();
    }

    this.animationFrameID = requestAnimationFrame(this.updateGameState.bind(this));
  }
}
