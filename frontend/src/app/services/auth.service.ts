import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'USER';
}

export interface AuthResponse {
  token: string;
  username: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/auth';
  private tokenKey = 'auth_token';
  private usernameKey = 'auth_username';
  private roleKey = 'auth_role';
  private storage: Storage = sessionStorage;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<string | null>(this.getUsername());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, request).pipe(
      tap(response => this.handleAuthSuccess(response))
    );
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request).pipe(
      tap(response => this.handleAuthSuccess(response))
    );
  }

  logout(): void {
    this.storage.removeItem(this.tokenKey);
    this.storage.removeItem(this.usernameKey);
    this.storage.removeItem(this.roleKey);
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
  }

  private handleAuthSuccess(response: AuthResponse): void {
    this.storage.setItem(this.tokenKey, response.token);
    this.storage.setItem(this.usernameKey, response.username);
    this.storage.setItem(this.roleKey, response.role);
    this.isAuthenticatedSubject.next(true);
    this.currentUserSubject.next(response.username);
  }

  getToken(): string | null {
    return this.storage.getItem(this.tokenKey);
  }

  getUsername(): string | null {
    return this.storage.getItem(this.usernameKey);
  }

  getRole(): string | null {
    return this.storage.getItem(this.roleKey);
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  isUser(): boolean {
    return this.getRole() === 'USER';
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }
}
