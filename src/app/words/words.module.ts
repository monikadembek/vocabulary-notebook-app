import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';

import { WordListComponent } from './word-list/word-list.component';
import { WordAddComponent } from './word-add/word-add.component';
import { WordDetailComponent } from './word-detail/word-detail.component';
import { WordEditComponent } from './word-edit/word-edit.component';


@NgModule({
  declarations: [
    WordListComponent,
    WordAddComponent,
    WordDetailComponent,
    WordEditComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: WordListComponent },
      { path: 'add', component: WordAddComponent },
      { path: ':id', component: WordDetailComponent },
      { path: ':id/edit', component: WordEditComponent }
    ])
  ]
})
export class WordsModule { }
