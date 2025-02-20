import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  showPassword: boolean = false; // Track password visibility
  userType: string = 'student'; // Default selection


  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}

