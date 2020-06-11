import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import { FireDBService } from './fire-db.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  email = '';
  pass = '';
  authUser = null;

  constructor(public authFire: AngularFireAuth,
    private router: Router,
    private db: FireDBService) { }

  user = this.authFire.authState.pipe(map(authState => {
    console.log('authState: ', authState);
    if (authState) {
      this.authUser = authState;
      return authState;
    } else {
      return null;
    }
  }))

  login() {
    console.log('login!');
    return this.authFire.signInWithEmailAndPassword(this.email, this.pass)
      .then(user => {
        console.log('user logado con email: ', user);
        this.email = '';
        this.pass = '';
        this.authUser = user.user;
        this.db.updateUserData(user.user);
      })
  }

  glogin() {
    console.log('google login!');
    this.authFire.signInWithPopup(new auth.GoogleAuthProvider())
      .then(user => {
        console.log('user logado: ', user);
        this.email = '';
        this.pass = '';
        this.authUser = user.user;
        this.db.updateUserData(user.user);
      })
      .catch(error => {
        console.log('error en google login: ', error);
      })
  }

  logout() {
    console.log('logout!');
    this.authFire.signOut();
    this.email = '';
    this.pass = '';
    this.router.navigate(['/']);
  }

}