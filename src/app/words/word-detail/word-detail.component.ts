import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WordsService } from '../../services/words.service';
import { Word } from '../word.model';
import { Location } from "@angular/common";

@Component({
  selector: 'app-word-detail',
  templateUrl: './word-detail.component.html',
  styleUrls: ['./word-detail.component.scss']
})
export class WordDetailComponent implements OnInit {

  word: Word = {
    userId: '',
    word: '',
    translations: [''],
    remembered: false,
    addDate: new Date()
  };

  id: string;
  selected: String;

  constructor(private route: ActivatedRoute,
    private wordsService: WordsService,
    private location: Location) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('id from route', this.id);
    //get data of word with current id
    this.wordsService.getWord$(this.id).subscribe(
      data => {
        this.word = data;
        this.selected = this.word.remembered ? 'true' : 'false';
      }
    );
  }

  goBack() {
    this.location.back();
  }

  //react on change of angular mat button toggle to update value of remembered field 
  onChange(event) {
    //update field
    const toggleBtnVal = event.value === "true" ? true : false;
    this.wordsService.updateWordDoc(this.id, { remembered: toggleBtnVal })
      .then(() => console.log("remembered updated"));
  }

}
