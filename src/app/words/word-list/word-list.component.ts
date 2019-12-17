import { Component, OnInit } from '@angular/core';
import { Word, WordId } from '../word.model';
import { WordsService } from '../../services/words.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.scss']
})
export class WordListComponent implements OnInit {

  words$: Observable<WordId[]>;

  displayedColumns: string[] = ['word', 'translation', 'actions'];
  dataSource: WordId[];
  sampleDataBtn: boolean = false;

  constructor(public wordsService: WordsService) { }

  ngOnInit() {
    //this.words$ = this.wordsService.getWords$();
    this.words$ = this.wordsService.getWordsCollection$();
    this.words$.subscribe(
      data => {
        this.dataSource = data;
        this.sampleDataBtn = (this.dataSource.length > 0) ? false : true;

      }
    );
  }

  deleteWord(id: string): void {
    console.log("delete element ", id);
    this.wordsService.removeWordDoc(id)
      .then(res => {
        console.log(res);
        console.log('item deleted');
      });
  }

  updateWord(id: string, data: Partial<Word>) {
    this.wordsService.updateWordDoc(id, data);
  }
}
