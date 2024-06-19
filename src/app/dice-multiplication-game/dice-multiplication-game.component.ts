import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dice-multiplication-game',
  templateUrl: './dice-multiplication-game.component.html',
  styleUrls: ['./dice-multiplication-game.component.css']
})
export class DiceMultiplicationGameComponent implements OnInit {
  form: FormGroup;
  die1: number = 0;
  die2: number = 0;
  correctAnswer: number = 0;
  feedbackMessage: string = '';
  score: number = 0;
  round: number = 0;
  rolling: boolean = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      answer: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.rollDice();
  }

  rollDice() {
    this.rolling = true;
    const rollDuration = 1000; // duração da rolagem em ms
    const rollInterval = 100; // intervalo entre cada rolagem em ms
    let elapsed = 0;

    const rollIntervalId = setInterval(() => {
      if (elapsed < rollDuration) {
        this.die1 = Math.floor(Math.random() * 10) + 1;
        this.die2 = Math.floor(Math.random() * 10) + 1;
        elapsed += rollInterval;
      } else {
        clearInterval(rollIntervalId);
        this.die1 = Math.floor(Math.random() * 10) + 1;
        this.die2 = Math.floor(Math.random() * 10) + 1;
        this.correctAnswer = this.die1 * this.die2;
        this.rolling = false;
      }
    }, rollInterval);
  }

  checkAnswer() {
    const playerAnswer = this.form.get('answer')?.value;
    if (parseInt(playerAnswer) === this.correctAnswer) {
      this.feedbackMessage = 'Correto!';
      this.score++;
    } else {
      this.feedbackMessage = `Errado! A resposta correta era ${this.correctAnswer}.`;
    }
    this.form.reset();
    this.round++;
    this.rollDice();
  }

  resetGame() {
    this.score = 0;
    this.round = 0;
    this.rollDice();
    this.form.reset();
    this.feedbackMessage = '';
  }
}
