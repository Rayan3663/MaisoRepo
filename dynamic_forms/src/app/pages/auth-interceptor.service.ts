import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import {AuthService} from 'src/app/auth.service'

@Injectable()
export class AuthInterceptorClass implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // debugger
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      request = this.addToken(request, accessToken);
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401 && !this.isRefreshing) {
          this.isRefreshing = true;
          return this.authService.refreshToken().pipe(
            switchMap((response: any) => {
              this.isRefreshing = false;
              localStorage.setItem('accessToken', response.access_token);
              return next.handle(this.addToken(request, response.access_token));
            }),
            catchError(err => {
              this.isRefreshing = false;
              return throwError(err);
            })
          );
        } else {
          return throwError(error);
        }
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}