import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { ENDPOINT } from '../../../shared/const/endpoint.const';
import { ERROR_MESSAGE } from '../../../shared/const/error-message.const';
import { ErrorResponse } from '../../../shared/enum/error-response.enum';
import { AuthResponseData } from '../models/auth-response.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient,
              private router: Router) { }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `${environment.auth.url}${ENDPOINT.SIGN_UP}${environment.auth.key}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    )
    .pipe(
      catchError(this.handleError),
      tap(responseData => {
        this.handleAuthentication(
          responseData.email,
          responseData.localId,
          responseData.idToken,
          +responseData.expiresIn
        );
      })
    );
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `${environment.auth.url}${ENDPOINT.SIGN_IN}${environment.auth.key}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    )
    .pipe(
      catchError(this.handleError),
      tap(responseData => {
        this.handleAuthentication(
          responseData.email,
          responseData.localId,
          responseData.idToken,
          +responseData.expiresIn
        );
      })
    );
  }

  autoLogin(): void {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();

      this.autoLogout(expirationDuration);
    }
  }

  logout(): void {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    // localStorage.clear();
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationNumber: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationNumber);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number): void {
    const EXPIRATION_DATE = new Date(
      new Date().getTime() + expiresIn * 1000
    );
    const USER = new User(
      email,
      userId,
      token,
      EXPIRATION_DATE
    );
    this.user.next(USER);
    this.autoLogout(expiresIn * 1000);
    console.log(expiresIn);
    localStorage.setItem('userData', JSON.stringify(USER));
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<AuthResponseData> {
    let errorMessage = ERROR_MESSAGE.DEFAULT;
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case ErrorResponse.EMAIL_EXISTS:
        errorMessage = ERROR_MESSAGE.EMAIL_EXISTS;
        break;
      case ErrorResponse.EMAIL_NOT_FOUND:
        errorMessage = ERROR_MESSAGE.EMAIL_NOT_FOUND;
        break;
      case ErrorResponse.INVALID_PASSWORD:
        errorMessage = ERROR_MESSAGE.INVALID_PASSWORD;
        break;
    }
    return throwError(errorMessage);
  }
}
