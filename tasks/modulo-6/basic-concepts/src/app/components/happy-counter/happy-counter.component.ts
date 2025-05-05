import { Component } from '@angular/core';

@Component({
  selector: 'app-happy-counter',
  imports: [],
  templateUrl: './happy-counter.component.html',
  styleUrl: './happy-counter.component.scss'
})
export class HappyCounterComponent {
  counter: number;
  limitText: string = "You have reached the limit!";
  showText: boolean = false;

  constructor() {
    this.counter = 0;
  }

  increment() {
    this.counter++;
    this.showText = false;
  }

  decrement() {
    if (this.counter > 0) {
      this.counter--;
      return;
    } else {
      this.showText = true;
    }
  }

  restart() {
    this.counter = 0;
  }
}
