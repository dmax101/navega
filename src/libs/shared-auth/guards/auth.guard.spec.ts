import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useValue: {
            getAuthState: () => of({ isAuthenticated: true })
          }
        }
      ]
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should allow activation when authenticated', (done) => {
    const result = guard.canActivate({} as any, { url: '/dashboard' } as any);
    if (result && typeof (result as any).subscribe === 'function') {
      (result as any).subscribe((res: any) => {
        expect(res).toBe(true);
        done();
      });
    } else if (result instanceof Promise) {
    jest.spyOn(authService, 'getAuthState').mockReturnValueOnce(of({ isAuthenticated: false, user: null, token: null }));
    const result = guard.canActivate({} as any, { url: '/dashboard' } as any);
    if (result && typeof (result as any).subscribe === 'function') {
      (result as any).subscribe((res: any) => {
        expect(res.toString()).toContain('/login');
        done();
      });
    } else if (result instanceof Promise) {
      (result as Promise<any>).then(res => {
        expect(res.toString()).toContain('/login');
        done();
      });
    } else {
      expect(result.toString()).toContain('/login');
      done();
    }
      expect(result).toBe(true);
      done();
    }
  });

  it('should redirect to login when not authenticated', (done) => {
    jest.spyOn(authService, 'getAuthState').mockReturnValueOnce(of({ isAuthenticated: false, user: null, token: null }));
    const result = guard.canActivate({} as any, { url: '/dashboard' } as any);
    if (result && typeof (result as any).subscribe === 'function') {
      (result as any).subscribe((res: any) => {
        expect(res.toString()).toContain('/login');
        done();
      });
    } else if (result instanceof Promise) {
      (result as Promise<any>).then(res => {
        expect(res.toString()).toContain('/login');
        done();
      });
    } else {
      expect(result.toString()).toContain('/login');
      done();
    }
  });
});
