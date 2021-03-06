import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Word, WordId } from '../word.model';
import { WordsService } from '../../services/words.service';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.scss']
})
export class WordListComponent implements OnInit {

  words$: Observable<WordId[]>;

  displayedColumns: string[] = ['nr', 'word', 'translation', 'actions'];
  dataSource: MatTableDataSource<WordId>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

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
        this.dataSource.sort = this.sort;
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

  //function to filter through dataSource and leave only filtered rows in the MatTable
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addSampleData() {
    this.wordsService.addSampleData()
  }

  //react on change of angular mat button toggle to update value of remembered field 
  onChange(event) {
    //update field
    let selectedButtons = event.value;
    console.log("Selected columns:");
    console.log(selectedButtons);
    this.displayedColumns = ['nr', ...selectedButtons, 'actions'];
  }
}
