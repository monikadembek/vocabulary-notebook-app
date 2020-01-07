import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Word, WordId } from '../word.model';
import { WordsService } from '../../services/words.service';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.scss']
})
export class WordListComponent implements OnInit {

  words$: Observable<WordId[]>;

  displayedColumns: string[] = ['word', 'translation', 'actions'];
  dataSource: MatTableDataSource<WordId>;
  sampleDataBtn: boolean = false; //displays button to add sample data if words colection is empty

  constructor(private wordsService: WordsService) { }

  ngOnInit() {
    //this.words$ = this.wordsService.getWords$();
    this.words$ = this.wordsService.getWordsCollection$();
    this.words$.subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.sampleDataBtn = (data.length > 0) ? false : true;
        console.log(data);
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

  addSampleData() {
    this.wordsService.addSampleData()
  }
}
