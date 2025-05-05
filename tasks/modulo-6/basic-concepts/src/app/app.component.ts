import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CrazyListComponent } from './components/crazy-list/crazy-list.component';
import { HappyCounterComponent } from './components/happy-counter/happy-counter.component';
import { BigFormComponent } from './components/big-form/big-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CrazyListComponent, HappyCounterComponent, BigFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'basic-concepts';
}
