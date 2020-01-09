import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Word } from '../word.model';
import { WordsService } from '../../services/words.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';


@Component({
  selector: 'app-word-edit',
  templateUrl: './word-edit.component.html',
  styleUrls: ['./word-edit.component.scss']
})
export class WordEditComponent implements OnInit {
 
  //1. take id from ActivatedRoute -> ngOnInit
  //2. use that id to get document with that id from words collection -> ngOnInit
  //3. create form using FormBuilder and fill it with retrieved data
      // iterate through contexts and transtations to create FormArray
  //4. in onSubmit method update the document 
  //5. navigate back to previous page

  id: string;
  wordForm: FormGroup;
  word: Word;

  validationMessages = {
    required: 'This field is required',
    translationRequired: 'Translation is required'
  };

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private wordsService: WordsService,
              private snackBar: MatSnackBar,
              private location: Location) { }

  ngOnInit(): void {
    //get current id
    this.id = this.route.snapshot.paramMap.get('id');

    //get data of word with current id
    this.wordsService.getWord$(this.id).subscribe(
      data => {
        this.word = data;
        console.log("data to update: ");
        console.log(data);
        //create form and fill it with retrieved data
        this.createForm();
      }
    );

  }

  createForm() {
    this.wordForm = this.fb.group({
      word: [this.word.word, [Validators.required]],
      translations: this.fb.array([]),
      pronounciation: this.word.pronounciation,
      contexts: this.fb.array([]),
      notes: this.word.notes
    });

    this.generateTranslationsFormArray(this.word.translations);
    if (this.word.contexts.length > 0) {
      this.generateContextsFormArray(this.word.contexts)
    }
  }

  get translations() {
    return this.wordForm.get('translations') as FormArray;
  }

  generateTranslationsFormArray(data) {
    for (let i = 0; i < data.length; i++ ) {
      this.translations.push(this.fb.control(data[i], [Validators.required]));
    }
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

  generateContextsFormArray(data) {
    for (let i = 0; i < data.length; i++ ) {
      this.contexts.push(this.fb.control(data[i]));
    }
  }

  deleteContext(i: number) {
    this.contexts.controls.splice(i, 1); //delete formControl
    this.contexts.value.splice(i, 1); //delete value of deleted formControl
    console.log(this.contexts);
  }

  //update word
  onSubmit() {
    const updatedWord = {
      ...this.wordForm.value,
    }
    console.log("updated word: ");
    console.log(updatedWord);

    this.wordsService.updateWordDoc(this.id, updatedWord)
      .then(
        () => {
          console.log("word updated");
          this.snackBar.open("Word updated", "OK", {
            duration: 3000
          });
          this.goBack();
        }
      )
      .catch(
        err => {
          console.log("Problem with updating word");
          this.snackBar.open("Error occured while updating word", "OK", {
            duration: 3000
          });
        }
      );
  }

  goBack() {
    this.location.back();
  }

}









