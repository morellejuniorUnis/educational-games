import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-multiplication-table-game',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './multiplication-table-game.component.html',
  styleUrls: ['./multiplication-table-game.component.css']
})
export class MultiplicationTableGameComponent implements OnInit {
  form: FormGroup;
  results: { [key: string]: boolean } = {};

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnInit() {
    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 10; j++) {
        this.form.addControl(`${i}x${j}`, this.fb.control('', Validators.required));
      }
    }
  }

  validate() {
    this.results = {};
    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 10; j++) {
        const control = this.form.get(`${i}x${j}`);
        const value = parseInt(control?.value, 10);
        const correctValue = i * j;
        if (value !== correctValue) {
          this.results[`${i}x${j}`] = false;
        } else {
          this.results[`${i}x${j}`] = true;
        }
      }
    }
  }

  reset() {
    this.form.reset();
    this.results = {};
  }
}
