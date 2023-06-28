import { Injectable, inject } from '@angular/core';
import {
  Auth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  auth: Auth = inject(Auth);

  async signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  setDisplayName(displayName: string) {
    const user = this.auth.currentUser;
    if (user) {
      updateProfile(user, { displayName });
    } else {
      throw new Error('Usuário não logado');
    }
  }

  resetPasword(email: string) {
    sendPasswordResetEmail(this.auth, email)
      .then(() => {
        console.log('Email enviado');
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
}
