import { Injectable, Inject, Optional } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

export interface SharedAuthConfig {
    tokenKey?: string;
    userKey?: string;
    loginRoute?: string;
    dashboardRoute?: string;
}

@Injectable()
export class AuthService {
    private readonly AUTH_TOKEN_KEY: string;
    private readonly USER_KEY: string;
  
  private authState$ = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null
  });

    constructor(
        @Optional() @Inject('AUTH_CONFIG') private config: SharedAuthConfig
    ) {
        // Usar configuração injetada ou valores padrão
        this.AUTH_TOKEN_KEY = config?.tokenKey || 'auth_token';
        this.USER_KEY = config?.userKey || 'auth_user';

    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    const token = localStorage.getItem(this.AUTH_TOKEN_KEY);
    const userStr = localStorage.getItem(this.USER_KEY);
    
    if (token && userStr) {
      const user = JSON.parse(userStr);
      this.authState$.next({
        isAuthenticated: true,
        user,
        token
      });
    }
  }

  login(username: string, password: string): Observable<boolean> {
    // Simula chamada HTTP com delay
    return of(this.validateCredentials(username, password)).pipe(
      delay(1000), // Simula latência de rede
      map(isValid => {
        if (isValid) {
          const mockUser: User = {
            id: 1,
            username,
            email: `${username}@example.com`
          };
          const mockToken = `mock-jwt-token-${Date.now()}`;
          
          this.setAuthData(mockUser, mockToken);
          return true;
        }
        return false;
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    
    this.authState$.next({
      isAuthenticated: false,
      user: null,
      token: null
    });
  }

  isLoggedIn(): boolean {
    return this.authState$.value.isAuthenticated;
  }

  getAuthState(): Observable<AuthState> {
    return this.authState$.asObservable();
  }

  getCurrentUser(): User | null {
    return this.authState$.value.user;
  }

  getToken(): string | null {
    return this.authState$.value.token;
  }

  private validateCredentials(username: string, password: string): boolean {
    // Mock: aceita qualquer usuário/senha não vazios
    return !!(username?.trim() && password?.trim());
  }

  private setAuthData(user: User, token: string): void {
    localStorage.setItem(this.AUTH_TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    
    this.authState$.next({
      isAuthenticated: true,
      user,
      token
    });
  }
}
