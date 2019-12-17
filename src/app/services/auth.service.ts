import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase/app';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from '../users/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<any>;
  loggedIn: boolean;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {
    //we listen to one observable and then switch to another observable
    this.user$ = this.afAuth.authState.pipe(
      switchMap( user => {
        if (user) {
          //checks if user is logged in
          //if there is user record in firestore that we can react to
          //valueChanges returns an observable
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else { //user is not logged in
          return of(null);
        }
      })
    );
  }

  isLoggedIn(): boolean {
    this.user$.subscribe(data => this.loggedIn = data.uid ? true : false )
    return this.loggedIn;
  }

  get authenticated(): boolean {
    return this.user$ !== null;
  }
  // get authenticated(): boolean {
  //   this.user$.subscribe(data => {
  //     const userId = data.uid; 
  //     return userId ? true : false;
  //   });
    
  //   //return this.user$ !== null;
  // }

  async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    console.log(credential);
    return this.updateUserData(credential.user);
  }

  async signOut() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  updateUserData(user: any) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }
    return userRef.set(data, {merge: true});
  }

}
