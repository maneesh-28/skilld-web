import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

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

  
constructor(private authService: AuthService,
  private toastr: ToastrService
) {}


  // Function to toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

   // Function to handle form submission
   register() {
    if (this.newUser.password !== this.confirmPassword) {
      // alert('Passwords do not match!');
      this.toastr.error('Passwords do not match!');
      return;
    }

    this.authService.register(this.newUser).subscribe(
      (response) => {
        console.log('Registration successful', response);
        this.toastr.success('Account created successfully!');

      },
      (error) => {
        console.error('Registration failed', error);
        this.toastr.error('Failed to register. Please try again.');
      }
    );
  }
}