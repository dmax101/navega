import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jest.Mocked<AuthService>;
  let router: Router;

  const mockAuthService = {
    login: jest.fn(),
    isLoggedIn: jest.fn(),
    getCurrentUser: jest.fn(),
    logout: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
    router = TestBed.inject(Router);

    // Reset mocks before each test
    jest.clearAllMocks();

    // Inicializa o componente sem detectChanges para evitar problemas com o template
    component.ngOnInit();
  });

  it('should create component and initialize form', () => {
    expect(component).toBeTruthy();
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('emailOuCpf')).toBeTruthy();
    expect(component.loginForm.get('password')).toBeTruthy();
    expect(component.isLoading).toBe(false);
    expect(component.errorMessage).toBe('');
  });

  it('should login successfully with valid credentials', async () => {
    // Arrange
    authService.login.mockReturnValue(of(true));
    const routerSpy = jest.spyOn(router, 'navigate');

    // Act
    component.loginForm.controls['emailOuCpf'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');
    component.onSubmit();

    // Wait for async operations
    await new Promise(resolve => setTimeout(resolve, 0));

    // Assert
    expect(authService.login).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(routerSpy).toHaveBeenCalledWith(['/dashboard']);
    expect(component.errorMessage).toBe('');
    expect(component.isLoading).toBe(false);
  });

  it('should show error message with invalid credentials', async () => {
    // Arrange
    authService.login.mockReturnValue(of(false));

    // Act
    component.loginForm.controls['emailOuCpf'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('wrongpassword');
    component.onSubmit();

    // Wait for async operations
    await new Promise(resolve => setTimeout(resolve, 0));

    // Assert
    expect(authService.login).toHaveBeenCalledWith('test@example.com', 'wrongpassword');
    expect(component.errorMessage).toBe('Credenciais inválidas. Tente novamente.');
    expect(component.isLoading).toBe(false);
  });
});
