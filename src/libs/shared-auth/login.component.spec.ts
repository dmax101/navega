import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

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

  it('should call auth.login on submit', async () => {
    authMock.isLoggedIn.mockReturnValue(false);
    component.loginForm.controls['username'].setValue('admin');
    component.loginForm.controls['password'].setValue('admin');
    component.onSubmit();
    await fixture.whenStable();
    expect(authMock.login).toHaveBeenCalledWith('admin', 'admin');
  });
});
