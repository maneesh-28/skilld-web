import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  role: string = 'student';// Stores the selected role
  password: string = ''; // Stores the password input
  confirmPassword: string = ''; // Stores the confirm password input
  showPassword: boolean = false; // Controls password visibility

  newUser = { 
    name: '',
    username: '', 
    email: '', 
    password: '' 
  };

  
constructor(private authService: AuthService) {}


  // Function to toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

   // Function to handle form submission
   register() {
    if (this.newUser.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    this.authService.register(this.newUser).subscribe(
      (response) => {
        console.log('Registration successful', response);
      },
      (error) => {
        console.error('Registration failed', error);
      }
    );
  }
}