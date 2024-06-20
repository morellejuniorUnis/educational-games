import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Subscription, interval } from 'rxjs';

interface Question {
  text: string;
  correctAnswer: number;
  incorrectAnswer: number;
}

@Component({
  selector: 'app-multiplication-game',
  templateUrl: './multiplication-game.component.html',
  styleUrls: ['./multiplication-game.component.css'],
})
export class MultiplicationGameComponent implements OnInit, OnDestroy {
  questions: Question[] = [];
  currentQuestion: Question | null = null;
  score = 0;
  totalQuestions = 10;
  currentQuestionIndex = 0;
  feedbackMessage: string | null = null;
  feedbackColor: string = 'green';
  answers: number[] = [];
  sectionKey: string = '';
  token: string = '';
  lastResponse: string = '';
  lastUpdatedAt: string = '';
  pollingSubscription: Subscription | undefined;
  correctAnswers = 0;
  incorrectAnswers = 0;
  tokenCopied = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.startGame();
  }

  ngOnDestroy() {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }

  startGame() {
    this.apiService.createNewSection().subscribe(
      (response) => {
        this.sectionKey = response.key;
        this.token = response.key;
        this.score = 0;
        this.currentQuestionIndex = 0;
        this.correctAnswers = 0;
        this.incorrectAnswers = 0;
        this.questions = this.generateQuestions();
        this.setCurrentQuestion();
        this.feedbackMessage = null;
        this.tokenCopied = false;

        this.startPolling();
      },
      (error) => {
        console.error('Erro ao criar nova seção:', error);
      }
    );
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
        incorrectAnswer: incorrectAnswer,
      });
    }
    return questions;
  }

  setCurrentQuestion() {
    if (this.currentQuestionIndex < this.totalQuestions) {
      this.currentQuestion = this.questions[this.currentQuestionIndex];

      this.answers = [
        this.currentQuestion.correctAnswer,
        this.currentQuestion.incorrectAnswer,
      ].sort(() => Math.random() - 0.5);
    } else {
      this.currentQuestion = null;
    }
  }

  checkAnswer(answer: number) {
    if (this.currentQuestion) {
      const isCorrect = answer === this.currentQuestion.correctAnswer;
      if (isCorrect) {
        this.score++;
        this.correctAnswers++;
        this.feedbackMessage = 'Você acertou!';
        this.feedbackColor = 'green';
      } else {
        this.incorrectAnswers++;
        this.feedbackMessage = 'Você errou!';
        this.feedbackColor = 'red';
      }
      this.apiService
        .updateNextQuestion(this.sectionKey, this.currentQuestionIndex + 1)
        .subscribe(
          (response) => {
            this.currentQuestionIndex++;
            if (this.currentQuestionIndex < this.totalQuestions) {
              this.setCurrentQuestion();
              this.getSectionInfo();
            } else {
              this.currentQuestion = null;
            }
          },
          (error) => {
            console.error('Erro ao atualizar a próxima pergunta:', error);
          }
        );
    }
  }

  getSectionInfo() {
    this.apiService.getSectionInfo(this.sectionKey).subscribe(
      (response) => {
        console.log('Informações da seção:', response);
        this.lastResponse = response.last_response;
        const updatedAt = response.updated_at;

        if (
          (this.lastResponse === '1' || this.lastResponse === '2') &&
          updatedAt !== this.lastUpdatedAt
        ) {
          this.lastUpdatedAt = updatedAt;

          const lastResponseNumber = parseInt(this.lastResponse, 10);
          const correctAnswer = this.currentQuestion?.correctAnswer;

          if (
            (lastResponseNumber === 1 && this.answers[0] === correctAnswer) ||
            (lastResponseNumber === 2 && this.answers[1] === correctAnswer)
          ) {
            this.correctAnswers++;
            this.feedbackMessage = 'Você acertou!';
            this.feedbackColor = 'green';
          } else {
            this.incorrectAnswers++;
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
      },
      (error) => {
        console.error('Erro ao obter informações da seção:', error);
      }
    );
  }

  startPolling() {
    this.pollingSubscription = interval(5000).subscribe(() => {
      this.getSectionInfo();
    });
  }

  copyToken() {
    navigator.clipboard
      .writeText(this.token)
      .then(() => {
        console.log('Token copiado para a área de transferência');
        this.tokenCopied = true;
      })
      .catch((err) => {
        console.error('Erro ao copiar o token:', err);
      });
  }
}
