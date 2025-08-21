import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login with valid credentials', async () => {
    const creds = { username: 'test', password: '123' };
    const result = await service.login(creds.username, creds.password).toPromise?.() ?? service.login(creds.username, creds.password);
    expect(result).toBeTruthy();
    expect(service.getCurrentUser()).toBeDefined();
    expect(service.getCurrentUser()?.username).toBe('test');
  });

  it('should logout and clear user', () => {
    service.logout();
    expect(service.getCurrentUser()).toBeNull();
  });
});
