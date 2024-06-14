import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MultiplicationGameComponent } from './multiplication-game/multiplication-game.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import { MultiplicationTableGameComponent } from './multiplication-table-game/multiplication-table-game.component';
import { DiceMultiplicationGameComponent } from './dice-multiplication-game/dice-multiplication-game.component';



@NgModule({
  declarations: [
    AppComponent,
    MultiplicationGameComponent,
    MultiplicationTableGameComponent,
    DiceMultiplicationGameComponent,
    MatTabsModule, 
    MatIconModule
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
