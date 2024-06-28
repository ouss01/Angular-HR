import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { environments } from 'environments/environments';
import { catchError, Observable, of, switchMap, tap, throwError } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
@Injectable({ providedIn: 'root' })
export class AuthService {
  url = environments.EmployeeApp;
  private _authenticated: boolean = false;
  private _httpClient = inject(HttpClient);
  private _userService = inject(UserService);

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for access token
   */
  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
  }

  /**
   * Setter & getter for refresh token
   */
  set refreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }

  get refreshToken(): string {
    return localStorage.getItem('refreshToken') ?? '';
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Forgot password
   *
   * @param email
   */
  forgotPassword(email: string): Observable<any> {
    return this._httpClient.post('api/auth/forgot-password', email);
  }

  /**
   * Reset password
   *
   * @param password
   */
  resetPassword(password: string): Observable<any> {
    return this._httpClient.post('api/auth/reset-password', password);
  }

  /**
   * Sign in
   *
   * @param credentials
   */
  signIn(credentials: { username: string; password: string }): Observable<any> {
    // Throw error, if the user is already logged in
    if (this._authenticated) {
      return throwError('User is already logged in.');
    }

    return this._httpClient.post(this.url + '/login/', credentials).pipe(
      tap((tokens: any) => this.saveTokens(tokens)),
    );
  }

  private saveTokens(tokens: any): void {
    this.accessToken = tokens.access_token;
    this.refreshToken = tokens.refresh_token;
    console.log(tokens);
    this._authenticated = true;
  }

  /**
   * Sign in using the access token
   */
  signInUsingToken(): Observable<any> {
    return this._httpClient.post(this.url + '/auth/sign-in-with-token/', {
        accessToken: this.accessToken,
    }).pipe(
        catchError(() => of(false)),
        switchMap((response: any) => {
            if (response.accessToken) {
                this.accessToken = response.accessToken;
            }
            this._authenticated = true;
            this._userService.user = response.user;
            return of(true);
        }),
    );
}


  /**
   * Refresh the access token using the refresh token
   */
  refreshAccessToken(): Observable<any> {
    return this._httpClient.post(this.url + '/auth/refresh/', {
      refresh: this.refreshToken,
    }).pipe(
      tap((tokens: any) => {
        this.accessToken = tokens.access_token;
      }),
      catchError(() => {
        // If refreshing the token fails, log out the user
        this.signOut();
        return throwError('Could not refresh token');
      }),
    );
  }

  decodeToken(): { [key: string]: any } | null {
    // Retrieve token from localStorage
    const token = localStorage.getItem('access_token');

    if (token) {
      try {
        // Split the token into header, payload, and signature parts
        const parts = token.split('.');
        if (parts.length !== 3) {
          throw new Error('Invalid JWT token format');
        }

        // Decode base64 encoded payload (second part)
        const decodedPayload = JSON.parse(atob(parts[1]));
        return decodedPayload;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    } else {
      console.error('No token found in localStorage');
      return null;
    }
  }
  /**
   * Sign out
   */
  signOut(): Observable<any> {
    // Remove the access token and refresh token from the local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Set the authenticated flag to false
    this._authenticated = false;

    // Return the observable
    return of(true);
  }

  /**
   * Sign up
   *
   * @param user
   */
  signUp(CustomUser: any): Observable<any> {
    // Adjust the URL based on your actual backend endpoint
    return this._httpClient.post<any>(this.url + '/register/', CustomUser);
  }

  /**
   * Unlock session
   *
   * @param credentials
   */
  unlockSession(credentials: { email: string; password: string }): Observable<any> {
    return this._httpClient.post(this.url + '/auth/unlock-session', credentials);
  }

  /**
   * Check the authentication status
   */
  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    // Check the access token availability
    if (!this.accessToken) {
      return of(false);
    }

    // Check the access token expire date
    if (AuthUtils.isTokenExpired(this.accessToken)) {
      // If the token is expired, try to refresh it
      return this.refreshAccessToken().pipe(
        switchMap(() => of(true)),
        catchError(() => of(false)),
      );
    }

    // If the access token exists, and it didn't expire, sign in using it
    return this.signInUsingToken();
  }
}
