import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, tap } from 'rxjs/operators';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();
  private tokenKey = 'token'; // Key used to store the JWT in localStorage
  private apiUrl = 'http://localhost:31130/api/Auth';
  redirectUrl: string | null = null; // Store the redirect URL


  constructor(private http: HttpClient,private router: Router) {}

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: { token: string }) => this.setToken(response.token)),
      catchError(this.handleError),
      tap(() => {
        // Redirect to the originally requested URL or default to '/products'
        this.router.navigate([this.redirectUrl || '/products']);
      })
    );
  }

  register(userData: { firstName: string; lastName: string; username: string; email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData).pipe(
      catchError(this.handleError),
      tap(() => {
        // Redirect to the login page after successful registration
        this.router.navigate(['/login']);
      })
    );
  }


  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.tokenKey);
    }
  }

  isAuthenticated(): boolean {
    if (this.isBrowser()) {
      const token = localStorage.getItem(this.tokenKey);
      return !!token && !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }

  getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  getRole(): string | null {
    if (this.isBrowser()) {
      const token = localStorage.getItem(this.tokenKey);
      if (token) {
        const decodedToken = this.jwtHelper.decodeToken(token);
        return decodedToken.role || null; // Use '|| null' to ensure a null return if role is undefined
      }
    }
    return null;
  }

  private setToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    // Customize the error message based on status codes or response
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend error
      switch (error.status) {
        case 400:
          errorMessage = 'Bad request. Please check your input.';
          break;
        case 401:
          errorMessage = 'Unauthorized. Invalid credentials.';
          break;
        case 403:
          errorMessage = 'Forbidden. You do not have permission.';
          break;
        case 404:
          errorMessage = 'Not found. The resource does not exist.';
          break;
        case 500:
          errorMessage = 'Internal server error. Please try again later.';
          break;
        default:
          errorMessage = `Server returned code ${error.status}, body was: ${error.error}`;
          break;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
