import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReactiveFormsComponent } from './pages/reactive-forms/reactive-forms.component';
import { LoginComponent } from './pages/login/login/login.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UploadModule } from '@progress/kendo-angular-upload';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { AuthInterceptor, AuthModule, LogLevel, StsConfigLoader } from 'angular-auth-oidc-client';

import { DialogsModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockDataService } from './mockdata.service';
import { AuthConfig, OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { RouterModule, Routes } from '@angular/router';
import { authConfig } from './auth.config';
import { StoreModule } from '@ngrx/store';
import { environment } from './environment';
import { SalesMainComponent } from './pages/sales-contract/sales-main/sales-main.component';
import { ContractComponent } from './pages/sales-contract/contract/contract.component';
import { InstallmentComponent } from './pages/sales-contract/installment/installment.component';
import { formReducer } from './store/form.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SalesContractSearchComponent } from './pages/NewPages/sales-contract-search/sales-contract-search.component';
import { SearchComponent } from './pages/search/search.component';
import { AuthInterceptorClass } from './pages/auth-interceptor.service';

export function authConfigFactory(): AuthConfig {
  return {
    // Provide the configuration here
    issuer: 'https://your-identity-server',
    redirectUri: window.location.origin,
    clientId: 'your-client-id',
    responseType: 'code',
    scope: 'openid profile email',
    showDebugInformation: true,
  };
}

// import { AuthConfigService } from './auth-config.service';
// ButtonsModule
// const routes: Routes = [
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   {path:'tabs/sales', component:SalesMainComponent},
//   { path: 'tabs/contract', component: ContractComponent },
//     { path: 'tabs/installment', component: InstallmentComponent },
 
// ];

@NgModule({
  declarations: [
    AppComponent,
    ReactiveFormsComponent,
    LoginComponent,
    SalesMainComponent,
    ContractComponent,
    InstallmentComponent,
    SalesContractSearchComponent,
    SearchComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    DropDownsModule,
    BrowserAnimationsModule,
    UploadModule,
    ButtonsModule,
    DialogsModule,
    DropDownsModule,
    TooltipModule ,
    // MatTabsModule
    // TabStripModule,
    GridModule,
    HttpClientModule  ,
    StoreModule.forRoot({ contractDetails: formReducer }),
//     StoreModule.forRoot({ contractDetails: formReducer }),
//     StoreDevtoolsModule.instrument({
// maxAge:25
//     }),
    // StoreModule.forRoot({ form: formReducer }),
    // !environment.production ? StoreDevtoolsModule.instrument() : [],
    // OAuthModule.forRoot(),
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost:4200'],
        sendAccessToken: true,
      },
    }),
    // AuthModule.forRoot({
    //   config: {
    //     authority: 'http://localhost:7003',
    //     redirectUrl: window.location.origin,
    //     postLogoutRedirectUri: window.location.origin,
    //     clientId: 'magic',
    //     scope: 'openid profile email offline_access',
    //     responseType: 'code',
    //     silentRenew: true,
    //     useRefreshToken: true,
    //     logLevel: LogLevel.Debug,
    //   },
    // }),
    
    ButtonsModule,
    StoreModule.forRoot({}, {})
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorClass,
      multi: true
    }
    // OAuthService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: (oauthService: OAuthService) => {
    //     return () => {
    //       oauthService.configure({
    //         issuer: 'https://localhost:7003',
    //         clientId: '"magic',
    //         redirectUri: window.location.origin + '/index.html',
    //         tokenEndpoint: 'https://localhost:7003/connect/token'
    //       });
    //       oauthService.loadDiscoveryDocumentAndTryLogin();
    //     };
    //   },
    //   deps: [OAuthService],
    //   multi: true
    // }
    
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor(private oauthService: OAuthService) {
  //   this.configureWithNewConfigApi();
  // }

  // private configureWithNewConfigApi() {
  //   this.oauthService.configure(authConfig);
  //   this.oauthService.loadDiscoveryDocumentAndTryLogin();
  // }
 }
