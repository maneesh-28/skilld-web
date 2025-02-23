import { Component } from '@angular/core';

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

  // Function to toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Function to handle form submission
  register() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('User Registered', { role: this.role, password: this.password });
  }
}
