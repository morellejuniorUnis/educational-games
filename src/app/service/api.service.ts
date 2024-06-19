import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://faculapi.avlq.online/sections';

  constructor(private http: HttpClient) {}

  createNewSection(): Observable<any> {
    return this.http.get(`${this.baseUrl}/new`);
  }

  getSectionInfo(key: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/infos/${key}`);
  }

  updateNextQuestion(key: string, nextQuestionNumber: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/nextQuestion`, {
      key: key,
      next_question_number: nextQuestionNumber
    });
  }

  
}
