import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
    private toastr: ToastrService,
    private router: Router
  ) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.authService.login(this.user).subscribe(
      (response) => {
        console.log('Login successful', response);
        this.toastr.success('Login Successful!');

         // Store user and notify components
      this.authService.setUser(response.user);

         // Store token and user info in local storage
         localStorage.setItem('token', response.token);
        //  localStorage.setItem('user', JSON.stringify(response.user));
 
         // Redirect to home or another valid page
         this.router.navigate(['/shared/header']);
       },
      (error) => {
        console.error('Login failed', error);
        this.toastr.error('Error during login. Please try again!');
      }
    );
  }
}

