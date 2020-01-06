import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { WordListComponent } from './word-list/word-list.component';
import { WordAddComponent } from './word-add/word-add.component';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [
    WordListComponent,
    WordAddComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: WordListComponent },
      { path: 'add', component: WordAddComponent }
    ])
  ]
})
export class WordsModule { }
