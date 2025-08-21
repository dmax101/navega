import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '@navega/shared-auth/auth.service';

interface LoginForm {
  username: string;
  password: string;
}

@Component({
  selector: 'shared-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.checkIfAlreadyLoggedIn();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.loginForm = this.fb.group({
      emailOuCpf: ['', [Validators.required, Validators.pattern(/^(\d{11}|[\w.-]+@[\w.-]+\.[a-zA-Z]{2,})$/)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  private checkIfAlreadyLoggedIn(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const formValue = this.loginForm.value as any;
    this.auth.login(formValue.emailOuCpf, formValue.password)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (success: boolean) => {
          this.isLoading = false;
          if (success) {
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage = 'Credenciais inválidas. Tente novamente.';
          }
        },
        error: () => {
          this.isLoading = false;
          this.errorMessage = 'Erro interno. Tente novamente mais tarde.';
        }
      });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key)?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return `${fieldName === 'emailOuCpf' ? 'Email ou CPF' : 'Senha'} é obrigatório`;
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `${fieldName === 'emailOuCpf' ? 'Email ou CPF' : 'Senha'} deve ter pelo menos ${requiredLength} caracteres`;
      }
      if (field.errors['pattern']) {
        return 'Informe um email válido ou um CPF com 11 dígitos';
      }
    }
    return '';
  }
}
