import {Component, View} from 'angular/annotations';

@Component({selector: 'snake-dot'})
@View({
  directives: [],
  styleUrls: ['components/snake-dot/snake-dot.scss'],
})
export class SnakeDot {
  position = {x: undefined, y: undefined};
  size = {height: 20, width: 20};

  constructor() {}
}
