import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService, RegisterRequest } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isRegisterMode = true;

  loginForm: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
  }>;

  registerForm: FormGroup<{
    username: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
  }>;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: this.fb.control('', { nonNullable: true, validators: Validators.required }),
      password: this.fb.control('', { nonNullable: true, validators: Validators.required }),
    });

    this.registerForm = this.fb.group({
      username: this.fb.control('', { nonNullable: true, validators: Validators.required }),
      email: this.fb.control('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
      password: this.fb.control('', { nonNullable: true, validators: Validators.required }),
      confirmPassword: this.fb.control('', { nonNullable: true, validators: Validators.required }),
    });
  }

  toggleMode(): void {
    this.isRegisterMode = !this.isRegisterMode;

  }

  onLogin(): void {

    if (this.loginForm.valid) {
      const loginData = {
        username: this.loginForm.get('username')?.value || '',
        password: this.loginForm.get('password')?.value || '',
      };
      console.log(loginData);
      this.authService.login(loginData).subscribe({
        next: (res) => {
          console.log('Login response:', res);
          if (res && res.token) {
            localStorage.setItem('jwtToken', res.token);
            localStorage.removeItem('username');
            localStorage.removeItem('password');
            this.router.navigate(['/articles']);

          } else {
            alert('No token received');
          }

        },
        error: (err) => {
          alert('Login failed'), console.error('Login error:', err);
        }
      });
    }
  }

 onRegister(): void {
  if (this.registerForm.valid) {
    const { password, confirmPassword } = this.registerForm.value;
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const { confirmPassword: _, ...formValueWithoutConfirm } = this.registerForm.value;
    const registerPayload: RegisterRequest = formValueWithoutConfirm as RegisterRequest;

    this.authService.register(registerPayload).subscribe({
      next: (res: string) => {
        alert(res);
        this.registerForm.reset();

      

        // Switch to login mode AFTER small delay to ensure login form is rendered
        this.isRegisterMode = false;

        // Patch the login form after a delay so it's ready
        setTimeout(() => {
          this.loginForm.patchValue({
            username: registerPayload.username,
            password: registerPayload.password,
          });
        }, 100);
      },
      error: (e) => {
        alert('Registration failed');
        console.error('Registration error:', e);
      }
    });
  }
}

}
