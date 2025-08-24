import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const authMock = {
    login: jest.fn((username: string, password: string) => of(true)),
    getCurrentUser: jest.fn(() => ({ username: 'test' })),
    isLoggedIn: jest.fn(() => false)
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should call auth.login on submit with valid CPF', async () => {
    authMock.isLoggedIn.mockReturnValue(false);
    // CPF válido (formato com máscara)
    component.loginForm.controls['emailOuCpf'].setValue('123.456.789-09');
    component.loginForm.controls['password'].setValue('senha123');
    component.onSubmit();
    await fixture.whenStable();
    expect(authMock.login).toHaveBeenCalledWith('123.456.789-09', 'senha123');
  });

  it('should call auth.login on submit with valid email', async () => {
    authMock.isLoggedIn.mockReturnValue(false);
    component.loginForm.controls['emailOuCpf'].setValue('usuario@email.com');
    component.loginForm.controls['password'].setValue('senha123');
    component.onSubmit();
    await fixture.whenStable();
    expect(authMock.login).toHaveBeenCalledWith('usuario@email.com', 'senha123');
  });

  it('should not submit with invalid CPF', async () => {
    authMock.isLoggedIn.mockReturnValue(false);
    // CPF inválido (menos de 11 dígitos)
    component.loginForm.controls['emailOuCpf'].setValue('123.456.789-0');
    component.loginForm.controls['password'].setValue('senha123');
    let errorCaught = false;
    try {
      component.onSubmit();
      await fixture.whenStable();
    } catch (e) {
      errorCaught = true;
    }
    expect(authMock.login).not.toHaveBeenCalled();
    expect(component.loginForm.controls['emailOuCpf'].invalid).toBe(true);
    expect(errorCaught).toBeFalsy(); // O submit não deve lançar erro, apenas não chamar login
  });
});
