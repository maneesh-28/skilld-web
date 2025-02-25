import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private authService: AuthService,
    private toastr: ToastrService
  ) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.authService.login(this.user).subscribe(
      (response) => {
        console.log('Login successful', response);
        this.toastr.success('Login Successful!');
        localStorage.setItem('token', response.token);
      },
      (error) => {
        console.error('Login failed', error);
        this.toastr.error('Error during login. Please try again!');
      }
    );
  }
}

