import { Component, OnInit } from '@angular/core';
import { WordsApiService } from '../../services/words-api.service';

@Component({
  selector: 'app-word-random',
  templateUrl: './word-random.component.html',
  styleUrls: ['./word-random.component.scss']
})
export class WordRandomComponent implements OnInit {

  randomWord:any = {};
  constructor( private wordsApi: WordsApiService) {
    //this.wordsApi.authorize().subscribe(data=> console.log("logged"));

  }

  ngOnInit() {
    this.wordsApi.getRandomWord().subscribe(data => {
      this.randomWord = data;
      console.log(data)
    });
  }

}
