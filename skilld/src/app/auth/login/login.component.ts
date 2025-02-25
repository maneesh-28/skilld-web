import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  showPassword: boolean = false; // Track password visibility
  userType: string = 'student'; // Default selection

  user = { 
    email: '',
    password: '' 
  };

  constructor(private authService: AuthService) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.authService.login(this.user).subscribe(
      (response) => {
        console.log('Login successful', response);
        localStorage.setItem('token', response.token);
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}

