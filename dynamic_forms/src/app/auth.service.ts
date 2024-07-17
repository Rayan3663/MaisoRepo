import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
// import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { Observable,throwError } from 'rxjs';
import { BodyModule } from '@progress/kendo-angular-grid';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl = 'https://localhost:7003';
    private clientId = 'magic';
    private redirectUri = 'http://localhost:4200/callback'; // Your Angular app's redirect URI
    private codeVerifier: string;

    private apiGettokenByAuthCodeUrl = 'https://localhost:7001/api/v1/UsersAuth/code';

    constructor(private http: HttpClient) {
        // this.configureOAuth();
    }

    // private configureOAuth() {
    //     this.oauthService.configure(authConfig);
    //     this.oauthService.loadDiscoveryDocumentAndLogin();
    // }

    getTokenByAuthCode(): Observable<any>{
        
        return this.http.get<any>(window.location.href=this.apiGettokenByAuthCodeUrl);
        // debugger
    }

    // login(username: string, password: string): void {
    //     this.oauthService.fetchTokenUsingPasswordFlowAndLoadUserProfile(username, password).then(() => {
    //         console.log('Login successful');
    //     }).catch((error) => {
    //         console.error('Login failed', error);
    //     });
    // }

    // logout(): void {
    //     this.oauthService.logOut();
    // }

    // isLoggedIn(): boolean {
    //     return this.oauthService.hasValidAccessToken();
    // }

    // getAccessToken(): string | null {
    //     return this.oauthService.getAccessToken();
    // }


    // Generate a random code verifier
  private generateCodeVerifier(): string {
    const length = 128;
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let verifier = '';
    for (let i = 0; i < length; i++) {
      verifier += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    this.codeVerifier = verifier;
    return verifier;
  }

  // Create a code challenge from the code verifier using SHA-256 hashing
  private async createCodeChallenge(codeVerifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const base64String = btoa(String.fromCharCode.apply(null, hashArray))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    return base64String;
  }

  // Initiate the authorization request
  async login(): Promise<void> {
    // debugger
    const codeVerifier = this.generateCodeVerifier();
    localStorage.setItem('code_verifier',codeVerifier)
    const codeChallenge = await this.createCodeChallenge(codeVerifier);

    const authUrl = `${this.apiUrl}/connect/authorize?response_type=code&client_id=${this.clientId}&redirect_uri=${encodeURIComponent(this.redirectUri)}&scope=openid profile offline_access&code_challenge_method=S256&code_challenge=${codeChallenge}`;
    window.location.href = authUrl;
  }

  // Exchange authorization code for tokens
  exchangeAuthorizationCode(code: string): Observable<any> {
//  debugger
    const codeVerifier = localStorage.getItem('code_verifier');

    if (!codeVerifier) {
        throw new Error('Code verifier not found');
      }
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });    

    
    const body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('client_id', this.clientId);
    body.set('client_secret', 'secret');
    body.set('code_verifier', codeVerifier);
    body.set('code', code);
    body.set('redirect_uri', this.redirectUri);

    return this.http.post<any>(`${this.apiUrl}/connect/token`, body.toString(), { headers });
  }
  
  storeTokens(tokens: any): void {
    localStorage.setItem('accessToken', tokens.access_token);
    localStorage.setItem('refreshToken', tokens.refresh_token);
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('Refresh token not found');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();    
    body.set('client_id', this.clientId);
    body.set('refresh_token', refreshToken);
    body.set('client_secret', 'secret');

    return this.http.post<any>(`${this.apiUrl}/connect/token`, body.toString(), { headers }).pipe(
      tap(response => {
        this.storeTokens(response);
      }),
      catchError(this.handleError)
    );
  }

private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.error);
    return throwError('Something bad happened; please try again later.');
  }

}
