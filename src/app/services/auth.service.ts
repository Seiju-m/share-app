import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import  firebase  from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = this.afAuth.user;
  constructor(private afAuth: AngularFireAuth) {}
  login() {
    this.afAuth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        // if(result.user.email !== 'tfjkvar@gmail.com'){
        //   this.afAuth.signOut();
        // }
        console.log('resultttttttt:' + JSON.stringify(result.user.email));
      });
  }
  logout() {
    this.afAuth.signOut();
  }
}