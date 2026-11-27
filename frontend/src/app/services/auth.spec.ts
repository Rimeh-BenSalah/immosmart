import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false when no user is connected', () => {
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('should return true when a user is connected', () => {
    localStorage.setItem('user', JSON.stringify({
      id: 1,
      role: 'admin'
    }));

    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should return the user role', () => {
    localStorage.setItem('user', JSON.stringify({
      id: 1,
      role: 'admin'
    }));

    expect(service.getRole()).toBe('admin');
  });

  it('should return the user ID', () => {
    localStorage.setItem('user', JSON.stringify({
      id: 1,
      role: 'admin'
    }));

    expect(service.getUserId()).toBe(1);
  });
});
