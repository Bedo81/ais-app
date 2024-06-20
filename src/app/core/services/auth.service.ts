import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut } from '@angular/fire/auth';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  user$ = new BehaviorSubject<any>(null);

  constructor() {
    this.auth.onAuthStateChanged(user => {
      this.user$.next(user);
    });
  }

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(this.auth, provider);
  }

  async signOut() {
    await signOut(this.auth);
  }

  get user() {
    return this.auth.currentUser;
  }
}
