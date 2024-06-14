import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiplicationGameComponent } from './multiplication-game/multiplication-game.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import { MultiplicationTableGameComponent } from './multiplication-table-game/multiplication-table-game.component';
import { DiceMultiplicationGameComponent } from './dice-multiplication-game/dice-multiplication-game.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MultiplicationGameComponent, MultiplicationTableGameComponent, DiceMultiplicationGameComponent ,MatTabsModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'educational-games';
}
