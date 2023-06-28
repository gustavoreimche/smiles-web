import { Component } from '@angular/core';
import { IUser } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  user: IUser = this.initializeUser();

  initializeUser(): IUser {
    return {
      email: '',
      password: '',
      displayName: '',
    };
  }

  async signIn() {
    await this.authService
      .signIn(this.user.email, this.user.password)
      .then((response) => {
        if (response) {
          console.log(
            response.user.getIdTokenResult().then((result) => {
              console.log(result.token);
              localStorage.setItem('token', result.token);
            })
          );
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
}
