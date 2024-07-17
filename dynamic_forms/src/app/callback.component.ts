import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AuthService} from 'src/app/auth.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-callback',
  template: '<div>Redirecting...</div>'
})
export class CallbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      // debugger
      if (code) {
        this.authService.exchangeAuthorizationCode(code).subscribe(response => {
          console.log('Token response:', response);
          if(response != null && response != '' && response != undefined){
            this.authService.storeTokens(response);
            this.router.navigate(['/tabs/sales']);
          }
            
          // Handle token response here
        }, error => {
          console.error('Error exchanging code for token:', error);
        });
      } else {
        console.error('Authorization code not found in callback.');
      }
    });
  }

  
}
