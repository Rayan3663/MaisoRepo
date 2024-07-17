import { Component, inject } from '@angular/core';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // constructor(private oidcSecurityService: OidcSecurityService) {}

  // ngOnInit() {
  //   this.oidcSecurityService.checkAuth().subscribe((loginResponse: any) => {
  //     const { isAuthenticated, userData, accessToken, idToken, configId } = loginResponse;
  //     console.log('Is authenticated:', isAuthenticated);
  //     console.log('User data:', userData);
  //     console.log('Access token:', accessToken);
  //     console.log('ID token:', idToken);
  //     console.log('Config ID:', configId);
  //   });
  // }

  // login() {
  //   this.oidcSecurityService.authorize();
  // }

  // logout() {
  //   this.oidcSecurityService.logoff().subscribe(result => console.log(result));
  // }
}
