import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Word, WordId } from '../words/word.model';
import { sampleData } from '../words/sample-data';

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  lastElId: number = 0;

  constructor(private afs: AngularFirestore) { }

  addSampleData() {
    for (let i = 0; i < sampleData.length; i++) {
      //adds new document to words colection, without specyfing id
      //this.afs.collection<Word>(`words`).add(sampleData[i]);

      //adds new document with passed id and data
      this.afs.doc<Word>(`words/${i}`).set(sampleData[i]);
      this.lastElId = i;
    }
    console.log('sample data added');
  }

  //gets document data but without document id
  getWords$(): Observable<Word[]> {
    return this.afs.collection<Word>('words').valueChanges();
  }

  //gets document data with id, 
  getWordsCollection$(): Observable<WordId[]> {
    let wordCollection: AngularFirestoreCollection<Word>;
    let words$: Observable<WordId[]>;
    wordCollection = this.afs.collection<Word>('words');
    words$ = wordCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Word;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return words$;
  }

  //number of words in collection
  wordsCounter() {
    let counter: Number;
    this.getWords$().subscribe(
      value => {
        counter = value.length;
        return counter; 
      }
    );
  }

  //add word to collection
  addWord(word: Word) {
    this.lastElId++;
    return this.afs.doc<Word>(`words/${this.lastElId}`).set(word);
    
    // method for adding data to collection without specifying id
    //let wordCollection: AngularFirestoreCollection<Word>;
    //wordCollection = this.afs.collection<Word>('words');
    //wordCollection.add(word);
    
  }

  //remove document with given id from words collection
  removeWordDoc(id: string): Promise<void> {
    return this.afs.doc<Word>(`words/${id}`).delete();
  }

  //updates document with given id with passed data
  updateWordDoc(id: string, data: Partial<Word>): Promise<void> {
    return this.afs.doc<Word>(`words/${id}`).update(data);
  }



}
