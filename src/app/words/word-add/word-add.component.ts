import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Word } from '../word.model';
import { WordsService } from '../../services/words.service';

@Component({
  selector: 'app-word-add',
  templateUrl: './word-add.component.html',
  styleUrls: ['./word-add.component.scss']
})
export class WordAddComponent implements OnInit {

  wordForm: FormGroup;
  word: Word;

  //displayMessage: { [key: string]: string } = {};
  validationMessages = {
    required: 'This field is required',
  };

  constructor(private fb: FormBuilder,
    private wordsService: WordsService) { }

  ngOnInit(): void {
    this.wordForm = this.fb.group({
      word: ['', [Validators.required]],
      translations: this.fb.array([
        this.fb.control('', [Validators.required]) //populates array with initial control
      ]),
      pronounciation: '',
      contexts: this.fb.array([
        this.fb.control('')
      ]),
      notes: ''
    });
  }

  get translations() {
    return this.wordForm.get('translations') as FormArray;
  }

  addTranslation() {
    this.translations.push(this.fb.control(''));
  }

  deleteTranslation(i: number) {
    this.translations.controls.splice(i, 1); //delete formControl
    this.translations.value.splice(i, 1); //delete value of deleted formControl
    console.log(this.translations);
  }

  get contexts() {
    return this.wordForm.get('contexts') as FormArray;
  }

  addContext() {
    this.contexts.push(this.fb.control(''));
  }

  deleteContext(i: number) {
    this.contexts.controls.splice(i, 1); //delete formControl
    this.contexts.value.splice(i, 1); //delete value of deleted formControl
    console.log(this.contexts);
  }

  onSubmit() {
    //console.log(this.wordForm.value);
    this.word = {
      ...this.wordForm.value,
      userId: "OkXD0haCfCNWUnz1tLGxIATX7j42",
      remembered: false,
      addDate: new Date(),
      marked: false
    }
    console.log(this.word);
    this.wordsService.addWord(this.word);
  }

}
