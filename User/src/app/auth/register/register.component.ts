import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [FormsModule,CommonModule],
standalone:true,
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  data = { firstName: '', lastName: '', username: '', email: '', password: '' };
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.register(this.data).subscribe({
      next: () => {
        this.successMessage = 'Registration successful! Please login.';
        // Redirect handled by the AuthService after successful registration
      },
      error: (error) => {
        this.errorMessage = error.message || 'Registration failed. Please try again.';
      }
    });
  }
}