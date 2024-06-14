import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Question {
  text: string;
  correctAnswer: number;
  incorrectAnswer: number;
}

@Component({
  selector: 'app-multiplication-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './multiplication-game.component.html',
  styleUrls: ['./multiplication-game.component.css']
})
export class MultiplicationGameComponent implements OnInit {
  questions: Question[] = [];
  currentQuestion: Question | null = null;
  score = 0;
  totalQuestions = 10;
  currentQuestionIndex = 0;
  feedbackMessage: string | null = null;
  feedbackColor: string = 'green';
  answers: number[] = [];

  ngOnInit() {
    this.startGame();
  }

  generateQuestions(): Question[] {
    const questions: Question[] = [];
    for (let i = 0; i < this.totalQuestions; i++) {
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      const correctAnswer = num1 * num2;
      let incorrectAnswer;
      do {
        incorrectAnswer = correctAnswer + (Math.floor(Math.random() * 10) - 5);
      } while (incorrectAnswer === correctAnswer || incorrectAnswer < 0);
      questions.push({
        text: `${num1} x ${num2}`,
        correctAnswer: correctAnswer,
        incorrectAnswer: incorrectAnswer
      });
    }
    return questions;
  }

  startGame() {
    this.score = 0;
    this.currentQuestionIndex = 0;
    this.questions = this.generateQuestions();
    this.setCurrentQuestion();
    this.feedbackMessage = null;
  }

  setCurrentQuestion() {
    if (this.currentQuestionIndex < this.totalQuestions) {
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      this.answers = [this.currentQuestion.correctAnswer, this.currentQuestion.incorrectAnswer].sort(() => Math.random() - 0.5);
    } else {
      this.currentQuestion = null;
    }
  }

  checkAnswer(answer: number) {
    if (this.currentQuestion) {
      if (answer === this.currentQuestion.correctAnswer) {
        this.score++;
        this.feedbackMessage = 'Você acertou!';
        this.feedbackColor = 'green';
      } else {
        this.feedbackMessage = 'Você errou!';
        this.feedbackColor = 'red';
      }
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex < this.totalQuestions) {
        this.setCurrentQuestion();
      } else {
        this.currentQuestion = null;
      }
    }
  }
}
