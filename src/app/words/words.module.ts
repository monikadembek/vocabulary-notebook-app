import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';

import { WordListComponent } from './word-list/word-list.component';
import { WordAddComponent } from './word-add/word-add.component';
import { WordDetailComponent } from './word-detail/word-detail.component';


@NgModule({
  declarations: [
    WordListComponent,
    WordAddComponent,
    WordDetailComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: WordListComponent },
      { path: 'add', component: WordAddComponent },
      { path: ':id', component: WordDetailComponent },
      { path: ':id/edit', component: WordAddComponent }
    ])
  ]
})
export class WordsModule { }
