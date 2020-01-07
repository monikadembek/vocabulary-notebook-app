import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Word } from '../word.model';
import { WordsService } from '../../services/words.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


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
    translationRequired: 'Translation is required'
  };

  constructor(private fb: FormBuilder,
              private wordsService: WordsService,
              private authService: AuthService,
              private snackBar: MatSnackBar) { }

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

  //dynamically adds FormControl
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

  //dynamically adds FormControl
  addContext() {
    this.contexts.push(this.fb.control(''));
  }

  deleteContext(i: number) {
    this.contexts.controls.splice(i, 1); //delete formControl
    this.contexts.value.splice(i, 1); //delete value of deleted formControl
    console.log(this.contexts);
  }

  onSubmit() {
    this.word = {
      ...this.wordForm.value,
      userId: this.authService.userID,
      remembered: false,
      addDate: new Date(),
      marked: false
    }
    console.log(this.word);
    this.wordsService.addWord(this.word)
      .then(
        () => {
          console.log("added word to database");
          this.wordForm.reset();
          this.snackBar.open("Word added to database", "OK", {
            duration: 3000
          });
        }
      )
      .catch(
        err => {
          console.log("Problem with adding word to database");
          this.snackBar.open("Error occured", "OK", {
            duration: 3000
          });
        }
      );
  }

}
