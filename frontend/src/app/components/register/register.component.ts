import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
    registerForm: FormGroup;
    errorMessage = '';
    isLoading = false;

    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router
    ) {
      this.registerForm = this.fb.group({
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        role: ['user', [Validators.required]]
      }, { validators: this.passwordMatchValidator });
    }

    // Validateur personnalisé pour vérifier que les mots de passe correspondent
    passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');
      
      if (password && confirmPassword && password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      }
      return null;
    }
    onSubmit(): void {
      if (this.registerForm.valid) {
        this.isLoading = true;
        this.errorMessage = '';

        this.authService.register(this.registerForm.value).subscribe({
          next: (response) => {
            this.isLoading = false;
            console.log('Registration successful:', response);
            this.router.navigate(['/login']);

          },
          error: (error) => {
            this.isLoading = false;
            this.errorMessage = error.error?.error || 'Erreur lors de l\'inscription';
            console.error('Registration error:', error);
          }
        });
      }
    }

    get username() {
      return this.registerForm.get('username');
    }

    get email() {
      return this.registerForm.get('email');
    }

    get password() {
      return this.registerForm.get('password');
    }

    get confirmPassword() {
      return this.registerForm.get('confirmPassword');
    }

    get role() {
      return this.registerForm.get('role');
    }
}
