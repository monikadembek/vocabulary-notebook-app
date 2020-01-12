import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WordsApiService {

  constructor(private http: HttpClient) { }

  authorize() {
    return this.http.get<any>("https://wordsapiv1.p.mashape.com/words/soliloquy", {
      headers: new HttpHeaders({
        "X-Mashape-Key": "f39397c4b5mshe8ddb2fcf1e728ap1e5143jsndbd7c5215fb3"
      })
    });
  }

  getRandomWord() {
    return this.http.get<any>("https://wordsapiv1.p.rapidapi.com/words/?random=true", {
      headers: new HttpHeaders({
        "X-Mashape-Key": "f39397c4b5mshe8ddb2fcf1e728ap1e5143jsndbd7c5215fb3",
        "Accept": "application/json"
      })
    });

  }

}
